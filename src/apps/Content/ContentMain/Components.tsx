import React, { FC, ReactNode } from 'react'
import { useQuery, useClient } from '@based/react'
import { ErrorBoundary } from 'react-error-boundary'
import { BasedClient } from '@based/client'
import { View, ViewComponent, ComponentConfig } from '../types'
import * as ui from '~'
import {
  LoadingIcon,
  Row,
  border,
  styled,
  useContextMenu,
  ScrollArea,
  Text,
  Button,
  MoreIcon,
} from '~'

const propsWalker = (
  client: BasedClient,
  data: any,
  props: { [key: string]: any },
  isArr: boolean,
  vars: { [key: string]: any },
  setState: (val: any) => void
): any => {
  const n: { [key: string]: any } = isArr ? [] : {}

  for (const p in props) {
    const f = props[p]

    if (/on[A-Z]/.test(p)) {
      const fn = async (arg1, arg2) => {
        console.log('Exec function', vars)
        if (f.state) {
          const nState = propsWalker(
            client,
            data,
            f.state,
            false,
            {
              ...vars,
              arg1,
              arg2,
            },
            setState
          )
          const x = { ...vars, ...nState }
          console.info('new state', x)
          setState(x)
        } else if (f.function) {
          if (f.function.type === 'function') {
            const bla = await client.call(
              f.function.name,
              propsWalker(
                client,
                data,
                f.function.payload,
                false,
                {
                  ...vars,
                  arg1,
                  arg2,
                },
                setState
              )
            )
            console.info(bla)
            return bla
          } else if (f.function.type === 'query') {
            const bla = await client
              .query(
                f.function.name,
                propsWalker(
                  client,
                  data,
                  f.function.payload,
                  false,
                  {
                    ...vars,
                    arg1,
                    arg2,
                  },
                  setState
                )
              )
              .get()
            console.info(bla)
            return bla
          }
        }
      }
      n[p] = fn
    } else if (typeof f === 'string' && f.startsWith('$data')) {
      const escaped = f.match(/\'.+?'/)

      let x = f

      if (escaped && escaped[0]) {
        x = f.replace(escaped[0], '$1')
      }

      const segs = x.split('.')
      let d: any = { $data: data }
      for (let seg of segs) {
        if (seg === '$1') {
          seg = escaped[0].slice(1, -1)
        }
        d = d[seg] ?? undefined
        if (d === undefined) {
          break
        }
      }
      n[p] = d
    } else if (typeof f === 'string' && f.startsWith('$vars')) {
      const segs = f.split('.')
      let d: any = { $vars: vars }
      for (const seg of segs) {
        d = d[seg] ?? undefined
        if (d === undefined) {
          break
        }
      }
      n[p] = d
    } else {
      if (
        props[p] &&
        typeof props[p] === 'object' &&
        typeof props[p] !== 'function'
      ) {
        n[p] = propsWalker(
          client,
          data,
          props[p],
          Array.isArray(props[p]),
          vars,
          setState
        )
      } else {
        n[p] = props[p]
      }
    }
  }

  return n
}

export const RenderComponentInner: FC<{
  component: ViewComponent
  data: any
  state: any
  setState: (s: any) => void
}> = ({ component, data, state, setState }) => {
  console.info('got state', component.component, state)
  const client = useClient()

  try {
    const Component = ui[component.component]
    const props: { [key: string]: any } = propsWalker(
      client,
      data,
      component.props,
      false,
      state,
      setState
    )
    return (
      <ErrorBoundary fallback={<div>RENDER COMPONENT FAILED</div>}>
        <Component {...props} />
      </ErrorBoundary>
    )
  } catch (err) {
    return <>COMPONENT ERR</>
  }
}

export const RenderComponent: FC<{
  component: ViewComponent
  state: any
  setState: (s: any) => void
}> = ({ component, state, setState }) => {
  const client = useClient()

  if (component.function?.type === 'query') {
    const fn = propsWalker(
      client,
      {},
      component.function,
      false,
      state,
      setState
    )

    const { data, loading } = useQuery(
      component.function ? fn.name : undefined,
      fn.payload
    )

    if (loading) {
      return <LoadingIcon />
    }

    if (component.forEach) {
      const segs = component.forEach.split('.')
      let d: any = { $data: data }
      for (const seg of segs) {
        d = d[seg] ?? undefined
        if (d === undefined) {
          break
        }
      }
      if (d) {
        return d.map((v, i) => {
          return (
            <RenderComponentInner
              state={state}
              setState={setState}
              key={i}
              data={v}
              component={component}
            />
          )
        })
      } else {
        return <>cannot iterate over data...</>
      }
    } else {
      return (
        <RenderComponentInner
          state={state}
          setState={setState}
          data={data}
          component={component}
        />
      )
    }
  } else {
  }
}

export const Components: FC<{
  view: View<ComponentConfig>
  state: any
  setState: (s: any) => void
  actions: React.FC<{ view: View }>
}> = ({ view, state, setState, actions }) => {
  console.log(typeof actions)

  const contextMenu = useContextMenu<{ view: View }>(actions, { view })

  const components: ReactNode[] = []

  const isList = view.config.view === 'list'

  for (let i = 0; i < view.config.components.length; i++) {
    const component = view.config.components[i]
    if (Array.isArray(component)) {
      const nestedC: ReactNode[] = []
      for (let i = 0; i < component.length; i++) {
        const c = component[i]
        if (c.function?.type === 'query') {
          nestedC.push(
            <RenderComponent
              state={state}
              setState={setState}
              key={i}
              component={c}
            />
          )
        } else {
          nestedC.push(
            <RenderComponentInner
              state={state}
              setState={setState}
              data=""
              component={c}
            />
          )
        }
      }
      components.push(
        <Row
          style={{
            paddingLeft: 32,
            paddingRight: 32,
            paddingBottom: 24,
            borderBottom: isList ? border(1, 'border') : null,
            minWidth: '100%',
            maxWidth: '100%',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {nestedC}
        </Row>
      )
    } else {
      if (isList) {
        components.push(
          <Row
            style={{
              maxWidth: '100%',
              paddingLeft: 32,
              paddingRight: 32,
              paddingBottom: 24,
              borderBottom: border(1, 'border'),
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {component.function?.type === 'query' ? (
              <RenderComponent
                state={state}
                setState={setState}
                key={i}
                component={component}
              />
            ) : (
              <RenderComponentInner
                state={state}
                setState={setState}
                data=""
                component={component}
              />
            )}
          </Row>
        )
      } else {
        if (component.function?.type === 'query') {
          components.push(
            <RenderComponent
              state={state}
              setState={setState}
              key={i}
              component={component}
            />
          )
        } else {
          components.push(
            <RenderComponentInner
              state={state}
              setState={setState}
              data=""
              component={component}
            />
          )
        }
      }
    }
  }
  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
      }}
    >
      <styled.div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth: '100%',
          paddingTop: 16,
          paddingBottom: 32,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row
          style={{
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <Text typography="subtitle500">{view.name}</Text>
          <Button
            style={{ marginLeft: 16 }}
            ghost
            onClick={contextMenu}
            icon={MoreIcon}
          />
        </Row>
        <styled.div
          style={{
            paddingTop: 24,
            display: 'flex',
            gap: 24,
            width: '100%',
            maxWidth: '100%',
            marginTop: 16,
            paddingLeft: isList ? 0 : 32,
            paddingRight: isList ? 0 : 32,
            borderTop: border(1, 'border'),
            flexDirection: isList ? 'column' : 'row',
            flexWrap: !isList ? 'wrap' : undefined,
          }}
        >
          {components}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}

import React, { FC, ReactNode } from 'react'
import * as ui from '~'
import {
  Page,
  useContextState,
  Button,
  styled,
  ContextItem,
  useContextMenu,
  Row,
  MoreIcon,
  CloseIcon,
  LoadingIcon,
  DuplicateIcon,
  border,
  StateProvider,
  EditIcon,
  ScrollArea,
  Text,
  ContextDivider,
  useDialog,
} from '~'
import { View, ViewComponent, ComponentConfig } from '../types'
import { useQuery, useClient, Provider } from '@based/react'
import { AddViewModal, EditViewModal } from '../ViewModals'
import { BasedClient } from '@based/client'
import { ErrorBoundary } from 'react-error-boundary'

const Actions: FC<{ view: View }> = ({ view }) => {
  const { open } = useDialog()
  const client = useClient()
  return (
    <>
      <ContextItem
        icon={EditIcon}
        onClick={() => {
          open(
            <EditViewModal
              save
              onChange={(v) => {
                return client.call('db:set', {
                  $db: 'config',
                  $id: view.id,
                  ...v,
                })
              }}
              view={view}
            />
          )
          return false
        }}
      >
        Edit
      </ContextItem>
      <ContextItem
        onClick={() => {
          open(
            <AddViewModal
              view={{
                ...view,
                name: view.name + ' copy',
              }}
            />
          )
          return false
        }}
        icon={DuplicateIcon}
      >
        Clone
      </ContextItem>
      <ContextDivider />
      <ContextItem
        icon={CloseIcon}
        onClick={async () => {
          await client.call('db:delete', {
            $db: 'config',
            $id: view.id,
          })
          return false
        }}
      >
        Remove
      </ContextItem>
    </>
  )
}

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
        console.log('go fn')
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

          setState(nState)
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
      const segs = f.split('.')
      let d: any = { $data: data }
      for (const seg of segs) {
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

const RenderComponentInner: FC<{
  component: ViewComponent
  data: any
}> = ({ component, data }) => {
  const [state, setState] = useContextState<any>('state')

  console.info('got state', state)

  try {
    const client = useClient()
    const Component = ui[component.component]
    const props: { [key: string]: any } = propsWalker(
      client,
      data,
      component.props,
      false,
      state ?? {},
      setState
    )
    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Component {...props} />
      </ErrorBoundary>
    )
  } catch (err) {
    return <>go err!</>
  }
}

const RenderComponent: FC<{ component: ViewComponent }> = ({ component }) => {
  const [state, setState] = useContextState<any>('state')
  const client = useClient()

  if (component.function?.type === 'query') {
    const { data, loading } = useQuery(
      component.function ? component.function.name : undefined,
      component.function?.payload
        ? propsWalker(
            client,
            {},
            component.function?.payload,
            false,
            state,
            setState
          )
        : undefined
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
          return <RenderComponentInner key={i} data={v} component={component} />
        })
      } else {
        return <>cannot iterate over data...</>
      }
    } else {
      return <RenderComponentInner data={data} component={component} />
    }
  } else {
  }
}

const Components: FC<{ view: View<ComponentConfig> }> = ({ view }) => {
  const contextMenu = useContextMenu<{ view: View }>(Actions, { view })

  const components: ReactNode[] = []

  const isList = view.config.view === 'list'

  for (let i = 0; i < view.config.components.length; i++) {
    const component = view.config.components[i]
    if (Array.isArray(component)) {
      const nestedC: ReactNode[] = []
      for (let i = 0; i < component.length; i++) {
        const c = component[i]
        if (c.function?.type === 'query') {
          nestedC.push(<RenderComponent key={i} component={c} />)
        } else {
          nestedC.push(<RenderComponentInner data={''} component={c} />)
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
              <RenderComponent key={i} component={component} />
            ) : (
              <RenderComponentInner data={''} component={component} />
            )}
          </Row>
        )
      } else {
        if (component.function?.type === 'query') {
          components.push(<RenderComponent key={i} component={component} />)
        } else {
          ;<RenderComponentInner data={''} component={component} />
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

export const ContentMain: FC<{ hubClient: BasedClient }> = ({ hubClient }) => {
  const [view] = useContextState<string>('view')

  const { data, loading } = useQuery(view ? 'db' : undefined, {
    $db: 'config',
    $id: view,
    $all: true,
  })

  const { type } = data?.config ?? {}

  if (type == 'components') {
    return (
      <Provider client={hubClient}>
        <Components view={data} />
      </Provider>
    )
  }

  return null

  /*
  const [db] = useContextState('db', 'default')

  const views = useViews()

  const { data, loading } = useQuery(
    'db',
    view ? { $db: db, ...view.query } : undefined
  )

  console.info('data', data, view && { $db: db, ...view.query })

  console.info(
    'data ->',
    data,
    'Current view ->',
    view,
    'view -> ',
    view,
    'views -> ',
    views
  )

  console.info('DATA', data, loading, view)

  return (
    <Page>
      {view ? (
        <>
          <Button icon={<AddIcon />} space>
            Add Item
          </Button>
          <Table headers={view.headers} data={data?.data ?? []} height={400} />
        </>
      ) : (
        <div>no view</div>
      )}
    </Page>
  )
  */
}

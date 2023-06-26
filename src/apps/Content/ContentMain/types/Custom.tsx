import React, { FC, ReactNode } from 'react'
import { useQuery, useClient } from '@based/react'
import { ErrorBoundary } from 'react-error-boundary'
import { View, ViewComponent, ComponentConfig } from '../../types'
import * as ui from '~'
import useLocalStorage from '@based/use-local-storage'
import { ParseCtx, parseProps } from '../propsParser'
import {
  LoadingIcon,
  Row,
  border,
  styled,
  useContextMenu,
  ScrollArea,
  Text,
  Button,
  useContextState,
  MoreIcon,
} from '~'

export const RenderComponentInner: FC<{
  component: ViewComponent
  ctx: ParseCtx
}> = ({ component, ctx }) => {
  try {
    const Component = ui[component.component]
    const props: { [key: string]: any } = parseProps(component.props, ctx)
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
  ctx: ParseCtx
}> = ({ component, ctx }) => {
  if (component.function) {
    const fn = parseProps(component.function, ctx)
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
              ctx={{ ...ctx, data: v }}
              key={i}
              component={component}
            />
          )
        })
      } else {
        return <>cannot iterate over data...</>
      }
    } else {
      return (
        <RenderComponentInner ctx={{ ...ctx, data }} component={component} />
      )
    }
  } else {
    return 'No support for anything other then queries to get data! thx'
  }
}

export const Components: FC<{
  view: View<ComponentConfig>
  actions: React.FC<{ view: View }>
}> = ({ view, actions }) => {
  const [state, setState] = useLocalStorage('view-' + view, {})
  const [, setView] = useContextState<any>('view')
  const [, setOverlay] = useContextState<any>('overlay')
  const [target, setTarget] = useContextState<any>('target')

  const contextMenu = useContextMenu<{ view: View }>(actions, { view })

  const components: ReactNode[] = []

  const isList = view.config.view === 'list'

  const client = useClient()

  const targetDefaults = view.config?.target ?? {}

  const ctx: ParseCtx = {
    client,
    setState,
    setView,
    state,
    target: { ...targetDefaults, ...target },
    setTarget,
    args: [],
    data: {},
    setOverlay,
  }

  for (let i = 0; i < view.config.components.length; i++) {
    const component = view.config.components[i]
    if (Array.isArray(component)) {
      const nestedC: ReactNode[] = []
      for (let i = 0; i < component.length; i++) {
        const c = component[i]
        if (c.function) {
          nestedC.push(<RenderComponent ctx={ctx} key={i} component={c} />)
        } else {
          nestedC.push(<RenderComponentInner ctx={ctx} component={c} />)
        }
      }
      components.push(
        <Row
          key={i}
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
            key={i}
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
            {component.function ? (
              <RenderComponent ctx={ctx} key={i} component={component} />
            ) : (
              <RenderComponentInner ctx={ctx} component={component} />
            )}
          </Row>
        )
      } else {
        if (component.function) {
          components.push(
            <RenderComponent ctx={ctx} key={i} component={component} />
          )
        } else {
          components.push(
            <RenderComponentInner ctx={ctx} component={component} />
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

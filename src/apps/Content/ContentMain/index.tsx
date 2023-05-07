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
  EditIcon,
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
  data: any,
  props: { [key: string]: any },
  isArr?: boolean
): any => {
  const n: { [key: string]: any } = isArr ? [] : {}

  for (const p in props) {
    const f = props[p]
    if (typeof f === 'string' && f.startsWith('$data')) {
      const segs = f.split('.')
      let d: any = { $data: data }
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
        n[p] = propsWalker(data, props[p], Array.isArray(props[p]))
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
  const Component = ui[component.component]
  const props: { [key: string]: any } = propsWalker(data, component.props)
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Component {...props} />
    </ErrorBoundary>
  )
}

const RenderComponent: FC<{ component: ViewComponent }> = ({ component }) => {
  if (component.function.type === 'query') {
    const { data, loading } = useQuery(
      component.function.name,
      component.function.payload
    )

    return loading ? (
      <LoadingIcon />
    ) : (
      <RenderComponentInner data={data} component={component} />
    )
  } else {
    return null
  }
}

const Components: FC<{ view: View<ComponentConfig> }> = ({ view }) => {
  const contextMenu = useContextMenu<{ view: View }>(Actions, { view })

  const components: ReactNode[] = []

  for (let i = 0; i < view.config.components.length; i++) {
    const component = view.config.components[i]
    if (Array.isArray(component)) {
      const nestedC: ReactNode[] = []

      for (let i = 0; i < component.length; i++) {
        const c = component[i]
        nestedC.push(<RenderComponent key={i} component={c} />)
      }
      components.push(
        <Row
          style={{
            minWidth: '100%',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {nestedC}
        </Row>
      )
    } else {
      components.push(<RenderComponent key={i} component={component} />)
    }
  }
  return (
    <Page>
      <Row>
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
          marginTop: 16,
          borderTop: border(1, 'border'),
          flexDirection: view.config.view === 'list' ? 'column' : 'row',
          flexWrap: view.config.view === 'grid' ? 'wrap' : undefined,
        }}
      >
        {components}
      </styled.div>
    </Page>
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

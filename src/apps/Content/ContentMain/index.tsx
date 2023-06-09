import React, { FC } from 'react'
import {
  useContextState,
  ContextItem,
  CloseIcon,
  DuplicateIcon,
  EditIcon,
  ContextDivider,
  useDialog,
  styled,
} from '~'
import { View } from '../types'
import { useQuery, useClient, Provider } from '@based/react'
import { AddViewModal, EditViewModal } from '../ViewModals'
import { BasedClient } from '@based/client'
import { Components } from './Components'

import useLocalStorage from '@based/use-local-storage'
import { Content } from './Content'

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

export const ContentMain: FC<{ hubClient: BasedClient }> = ({ hubClient }) => {
  const [view] = useContextState<string>('view')

  const { data, loading } = useQuery(view ? 'db' : undefined, {
    $db: 'config',
    $id: view,
    $all: true,
  })

  console.log(data, '?????')

  const [state, setState] = useLocalStorage('view-' + view, {})

  const { type } = data?.config ?? {}

  if (type === 'components') {
    return (
      <Provider client={hubClient}>
        <Components
          state={state}
          setState={setState}
          view={data}
          actions={Actions}
        />
      </Provider>
    )
  } else if (type === 'content') {
    return (
      <Provider client={hubClient}>
        <styled.div>
          <Content view={data} actions={Actions} />
          <pre contentEditable>{JSON.stringify(data, null, 2)}</pre>
        </styled.div>
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

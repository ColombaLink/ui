import React, { FC } from 'react'
import {
  Table,
  Page,
  useContextState,
  AddIcon,
  Button,
  styled,
  ContextItem,
  useContextMenu,
  MoreIcon,
  CloseIcon,
  DuplicateIcon,
  EditIcon,
  ContextDivider,
  useDialog,
} from '~'
import { View } from '../types'
import { useQuery, useClient } from '@based/react'
import { AddViewModal, EditViewModal } from '../ViewModals'

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
              onChange={(view) => {
                const { id, ...rest } = view
                return client.call('db:set', {
                  $db: 'config',
                  $id: id,
                  ...rest,
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

export const ContentMain: FC<{}> = () => {
  const [view] = useContextState<string>('view')

  const { data, loading } = useQuery(view ? 'db' : undefined, {
    $db: 'config',
    $id: view,
    $all: true,
  })

  const { type } = data?.config ?? {}
  const contextMenu = useContextMenu(Actions, { view: data })

  if (type == 'components') {
    return (
      <Page>
        <>
          <Button ghost onClick={contextMenu} icon={MoreIcon} />
        </>
      </Page>
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

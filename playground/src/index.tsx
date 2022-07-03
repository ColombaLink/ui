import { render } from 'react-dom'
import React from 'react'
import {
  Provider,
  Authorize,
  Topbar,
  ContextDivider,
  LoadingIcon,
  Text,
  useContextMenu,
  StackedListItemsWrapper,
  StackedListItem,
  Avatar,
  useDialog,
  Button,
  ContextItem,
  AddIcon,
  EditIcon,
  useSelect,
  MoreIcon,
  CheckIcon,
} from '../../src'
import based from '@based/client'
import { useClient, useData } from '@based/react'
import { prettyDate } from '@based/pretty-date'
import getService from '@based/get-service'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const Todo = ({ id, name, description, createdAt, done }) => {
  const client = useClient()
  return (
    <StackedListItem
      right={
        <>
          <MoreIcon />
        </>
      }
    >
      <Avatar
        size={40}
        icon={done ? CheckIcon({ size: 16 }) : EditIcon({ size: 16 })}
        color={done ? 'Green' : 'BlueSailor'}
        onClick={() => {
          client.set({ $id: id, done: !done })
        }}
      />
      <div>
        <Text weight={600}>{name}</Text>
        <Text color="TextSecondary">{description}</Text>
        <Text>{prettyDate(createdAt, 'date-time')}</Text>
      </div>
    </StackedListItem>
  )
}

const UserProfile = ({ id }) => {
  const dialog = useDialog()
  const client = useClient()
  return (
    <>
      <ContextItem
        onClick={async () => {
          const url =
            (
              await getService(
                { ...client.opts, name: '@based/hub' },
                1,
                client.opts.cluster
              )
            ).url.replace('ws', 'http') +
            `/get?token=${encodeURIComponent(
              client.getToken()
            )}&q=${encodeURIComponent(
              JSON.stringify({
                $id: id,
                email: true,
                id: true,
                name: true,
                descendants: {
                  $all: true,
                  $list: true,
                },
              })
            )}`
          window.open(url)
        }}
      >
        Download user data
      </ContextItem>
      <ContextItem
        onClick={async () => {
          if (
            await dialog.confirm(
              'Are you sure you want to remove your account?'
            )
          ) {
            await client.delete({ $id: id })
            await client.logout()
          }
        }}
      >
        Delete account
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={async () => {
          await client.logout()
        }}
      >
        Logout
      </ContextItem>
    </>
  )
}

const App = ({ user }) => {
  const client = useClient()
  const [value, open] = useSelect(['Todo', 'All', 'Completed'], 'All')
  const { data, loading } = useData(
    user
      ? {
          $id: user.id,
          todos: {
            id: true,
            done: true,
            name: true,
            createdAt: true,
            description: true,
            $list: {
              $sort: {
                $field: 'createdAt',
                $order: 'desc',
              },
              $limit: 100,
              $offset: 0,
              $find: {
                $traverse: 'children',
                $filter:
                  value === 'All' || !value
                    ? {
                        $field: 'type',
                        $operator: '=',
                        $value: 'todo',
                      }
                    : [
                        {
                          $field: 'type',
                          $operator: '=',
                          $value: 'todo',
                        },
                        {
                          $field: 'done',
                          $operator: '=',
                          $value: value === 'Completed',
                        },
                      ],
              },
            },
          },
        }
      : null
  )

  return (
    <>
      <Topbar
        data={{ Projects: '/', Settings: '/settings' }}
        onProfile={useContextMenu(
          UserProfile,
          { id: user.id },
          { position: 'right', offset: { x: 0, y: 28 } }
        )}
      />
      <div
        style={{
          padding: '32px 48px',
          height: 'calc(100vh - 66px)',
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {loading ? (
          <LoadingIcon />
        ) : (
          <StackedListItemsWrapper
            topLeft={
              <>
                <Text color="PrimaryMain">Todos</Text>
                <Button ghost onClick={open}>
                  {value || 'All'}
                </Button>
              </>
            }
            topRight={
              <>
                <Button
                  onClick={async () => {
                    await client.set({
                      type: 'todo',
                      done: false,
                      name: 'New todo',
                      parents: [user.id],
                    })
                  }}
                  iconLeft={AddIcon}
                  ghost
                >
                  Add Todo
                </Button>
              </>
            }
          >
            <div style={{}}>
              {data.todos?.map((t) => {
                return <Todo {...t} key={t.id} />
              })}
            </div>
          </StackedListItemsWrapper>
        )}
      </div>
    </>
  )
}

render(
  <Provider theme="light" client={client}>
    <Authorize logo app={App} />
  </Provider>,
  document.body
)

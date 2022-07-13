import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Page, Text, Container, Button, border } from '~'
import { InfiniteList } from '~/components/InfiniteList'
import { useClient } from '@based/react'

const ListItem = ({ style, data, index }) => {
  const item = data[index]
  if (item) {
    const { from, subject, body, createdAt } = item
    return (
      <div
        style={{
          borderBottom: border(1),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...style,
        }}
      >
        <Text>{from}</Text>
        <Text size="11px">{subject}</Text>
        <Text size="11px" color="text2">
          {body}
        </Text>
      </div>
    )
  }
  return null
}

export const Inbox = () => {
  const client = useClient()
  return (
    <>
      <Topbar />
      <div style={{ display: 'flex' }}>
        <InfiniteList
          style={{ borderRight: border(1) }}
          width={240}
          height={400}
          itemSize={80}
          query={(offset, limit) => ({
            id: true,
            from: true,
            subject: true,
            body: true,
            $list: {
              $offset: offset,
              $limit: limit,
              $find: {
                $traverse: 'descendants',
                $filter: {
                  $field: 'type',
                  $operator: '=',
                  $value: 'email',
                },
              },
            },
          })}
        >
          {ListItem}
        </InfiniteList>
        <Page>
          <Container space={24}>
            <Button
              outline
              onClick={async () => {
                const from = 'youri@saulx.com'
                const to = 'jim@saulx.com'
                const [{ id: inboxId }, { id: outboxId }] = await Promise.all([
                  client.set({
                    type: 'inbox',
                    $alias: `inbox:${to}`,
                  }),
                  client.set({
                    type: 'outbox',
                    $alias: `outbox:${from}`,
                  }),
                ])

                return client.set({
                  parents: [inboxId, outboxId],
                  type: 'email',
                  from,
                  to,
                  subject: 'Just an email.. ' + ~~(Math.random() * 1e4),
                  body: 'Lorem ipsypoos',
                })
              }}
            >
              Send Email
            </Button>
          </Container>
          <Container>
            <Text>youri@saulx.com</Text>
            <Text>youri@saulx.com</Text>
            <Text>youri@saulx.com</Text>
          </Container>
        </Page>
      </div>
    </>
  )
}

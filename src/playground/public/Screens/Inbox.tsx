import React from 'react'
import { Topbar } from '~/components/Topbar'
import {
  Page,
  Text,
  Container,
  Button,
  Menu,
  Input,
  Avatar,
  Checkbox,
  StackedListItemsWrapper,
  StackedListItem,
  border,
} from '~'
import wait from '~/utils/wait'
import { InfiniteList } from '~/components/InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
const ListItem = ({ style, data, index }) => {
  return (
    <div
      style={{
        borderBottom: border(1),
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      hello {index}
    </div>
  )
}

export const Inbox = () => {
  return (
    <>
      <Topbar />
      <div style={{ display: 'flex' }}>
        <InfiniteList
          style={{ borderRight: border(1) }}
          width={240}
          height={400}
          // target=''
          query={(offset, limit) => ({
            id: true,
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
            <Button outline>Send Email</Button>
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

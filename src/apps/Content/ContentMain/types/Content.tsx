import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  useDialog,
  Table,
  Badge,
} from '~'
import { useQuery, useClient } from '@based/react'
import { ContentEditModal } from '../ContentEditModal'
import { BasedClient } from '@based/client'

const parseFunction = () => {}

const propsWalker = (
  obj: any,
  ctx: { data: any; state: any; args: any[]; client: BasedClient }
): any => {
  if (typeof obj !== 'object') {
    return {}
  }

  const newObj: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    const field = obj[key]

    if (/^on[A-Z]([a-z])+/.test(key)) {
      if (typeof field === 'object') {
        if (field.type === 'function') {
          newObj[key] = async (...args) => {
            const fn = propsWalker(field, {
              data: ctx.data,
              state: ctx.state,
              args,
              client: ctx.client,
            })
            return ctx.client.call(fn.name, fn.payload)
          }
        }
      } else {
        newObj[key] = () => console.error('Needs to be an object def')
      }
    } else if (typeof field === 'object') {
      newObj[key] = propsWalker(field, ctx)
    } else if (typeof field === 'string') {
      if (field[0] === '$') {
        // $data, $args, $state, $target
        const path = field.split('.')
        const type = path[0]
        if (type === '$data') {
          let d = ctx.data
          for (let i = 1; i < path.length; i++) {
            const seg = path[i]
            if (d?.[seg] !== undefined) {
              d = d[seg]
            } else {
              d = undefined
              break
            }
          }
          newObj[key] = d
        } else {
          // lets add some args!
          newObj[key] = 'latewr!!@#'
        }
      } else {
        newObj[key] = field
      }
    } else {
      newObj[key] = field
    }
  }

  return newObj
}

export const CustomContent = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })

  // const { open } = useDialog()

  console.log(view)

  const isTable = view.config.view === 'table'

  const { data } = useQuery(
    view.config.function.name,
    view.config.function.payload
  )

  const state = {}

  const client = useClient()

  //

  const props = propsWalker(view.config.props ?? {}, {
    data,
    state,
    client,
    args: [],
  })

  console.log('---------------->', props, data)

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 200,
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

        <styled.div style={{ width: '100%', padding: 24 }}>
          {/* {isTable && <Table {...props} />} */}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}

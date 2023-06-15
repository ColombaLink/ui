import React, { useRef } from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  Table,
} from '~'
import { useQuery, useClient } from '@based/react'
import { propsWalker } from '../propsWalker'

export const Content = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })

  // const { open } = useDialog()

  console.log(view)

  const isTable = view.config.view === 'table'

  // eerst query staat opzichzelf
  const { data } = useQuery(
    view.config.function.name,
    view.config.function.payload
  )

  const state = {}

  const client = useClient()

  const wtfRef = useRef()
  console.log('🤷🏻‍♂️', wtfRef)

  // propswalker magic
  const props = propsWalker(view.config.props ?? {}, {
    data,
    state,
    client,
    args: [],
  })

  // make it work in the table
  const parseThePropsFunction = (props) => {
    console.log('props from parseFunction,🤖 ', props)

    let data
    let headers = []

    if (props.$data) {
      data = props.$data
    }
    // generate a header if there is none
    if (!props.headers) {
      headers = []
      const keys = data?.map((obj, i) => Object.keys(data[i])[i])
      console.log(keys)
      keys?.map((item) => headers.push({ key: item }))
    } else {
      headers = props.$headers
    }

    return { data, headers, onClick: props.onClick }
  }

  parseThePropsFunction(props)

  console.log('%cpropswalker props------->', 'background-color:yellow;', props)
  console.log('DATA --> ', data)

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
          {isTable && <Table {...parseThePropsFunction(props)} />}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}

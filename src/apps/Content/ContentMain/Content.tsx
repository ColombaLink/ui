// make this now
import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  Table,
  useDialog,
} from '~'
import { useQuery, useClient } from '@based/react'
import { ContentEditModal } from './ContentEditModal'

/*
{
  type: 'content',
  view: 'table',
  list: 'descendants', // which property to use as data
  customFields: {
    name: {
      label: 'First Name'
    },
    image: {
      label: 'Avatar',
      type: 'thumbnail'
    }
  },
  query: {
    $id: 'root',
    descendants: {
      $list: true,
      name: true, // youxi
      image: true, // http://
      id: true,
      createdAt: true
    }
  }
}

const { data } = useQuery({

  $id: 'root',
  descendants: {
      $list: true,
      name: true, // youxi
      image: true, // http://
      id: true,
      createdAt: true
    }
})

data === {
  descendants: {
    name: 'youzi',
    image: 'http://xxx.com',
    ...
  }
}
*/

/* //////////////// 
example to get things to show up in table
{
  "type": "content",
  "view": "table",
  "query": {
    "name": "db",
    "type": "query",
    "descendants": {
      "$id": "root",
      "createdAt": true,
      "$all": true,
      "children": {
        "$list": true,
        "$all": true
      }
    }
  }
}

*/

export const Content = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })
  const { open } = useDialog()

  console.log('🐳', view)

  // de display component

  const isTable = view.config.view === 'table'
  // name, payload
  const { data, loading } = useQuery(
    view.config.query ? view.config.query.name : undefined,
    view.config.query.descendants
  )

  console.log('🐖 data', data)
  console.log('🐷 data children', data?.children)

  // if there is no header , generate this one
  console.log(data?.children?.[0])

  const tableHeader = []
  const trackProperties = []

  for (let i = 0; i < data?.children?.length; i++) {
    for (let property in data?.children?.[i]) {
      console.log(trackProperties)
      if (!trackProperties.includes(property.toString())) {
        trackProperties.push(property.toString())
        console.log(property)
        tableHeader.push({ key: property, label: property.toString() })
      }
    }
  }

  console.log(tableHeader, '📪')

  const tableClickHandler = (e, rowData) => {
    console.log('cellText --> ', e.target.textContent)
    console.log('rowData', rowData)
    open(<ContentEditModal rowData={rowData} />)
  }

  // schema name
  // const s = useItemSchema('fi')

  // let sloading = s.loading
  // let sfields = s.fields

  // console.log(sloading, sfields)

  // children, createdAt, descendants, id, type, updatedAt

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 300,
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
          {isTable && (
            <Table
              headers={tableHeader}
              data={data?.children}
              outline
              onClick={tableClickHandler}
            />
          )}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}

/** 
 * setting somethings to db
 * 
 {
  "type": "components",
  "view": "list",
  "components": [
    {
      "component": "Button",
      "props": {
        "children": [
          "Set name to: file"
        ],
        "onClick": {
          "function": {
            "name": "db:set",
            "type": "function",
            "payload": {
              "$id": "file",
              "name": "hallow"
            }
          }
        }
      }
    },
    {
      "component": "Button",
      "props": {
        "children": [
          "Set thumb to: file "
        ],
        "onClick": {
          "function": {
            "name": "db:set",
            "type": "function",
            "payload": {
              "$id": "file",
              "thumb": "https://robohash.org/157.97.115.31.png"
            }
          }
        }
      }
    }
  ]
}
 * 
*/

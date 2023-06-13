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
  Badge,
  useSchema,
  useContextState,
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

// Try this example // for specif type wiht id
{
  "type": "content",
  "view": "table",
  "query": {
    "name": "db",
    "type": "query",
    "descendants": {
      "$all": true,
      "$id": "109c42fced"
    }
  }
}
*/

export const Content = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })
  const { open } = useDialog()

  const [db] = useContextState('db', 'default')
  const [type] = useContextState('type', '')

  const { loading: loads, schema } = useSchema(db)

  console.log('🆚 shcema', schema)
  console.log('📳', type)

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

  const tableHeader = []
  const trackProperties = []

  // custom Component rules should be added to tableHeader
  const customCompId = ({ data, header }) => {
    return <Badge>{data[header.key]}</Badge>
  }

  const customCompType = ({ data, header }) => {
    return <Badge color="accent">{data[header.key]}</Badge>
  }

  const customCompTimeDate = ({ data, header }) => {
    return <Text>{new Date(data[header.key]).toLocaleDateString()}</Text>
  }

  const customCompChildren = ({ data, header }) => {
    console.log('📳', data, header)
    console.log('🈷️', data[header.key])

    return <Text>xx</Text>
  }

  const customCompThumb = ({ data, header }) => {
    return (
      <styled.div
        style={{
          width: 32,
          height: 32,
          backgroundImage: `url(${data[header.key]})`,
          backgroundSize: 'cover',
        }}
      />
    )
  }

  // if (data?.children?.length > 0) {
  //   for (let i = 0; i < data?.children?.length; i++) {
  //     for (let property in data?.children?.[i]) {
  //       // console.log(trackProperties)
  //       if (!trackProperties.includes(property.toString())) {
  //         trackProperties.push(property.toString())
  //         // console.log(property)
  //         tableHeader.push({
  //           key: property,
  //           label: property.toString(),
  //           customComponent:
  //             property === 'id'
  //               ? customCompId
  //               : property === 'type'
  //               ? customCompType
  //               : property === 'createdAt'
  //               ? customCompTimeDate
  //               : property === 'updatedAt'
  //               ? customCompTimeDate
  //               : property === 'thumb'
  //               ? customCompThumb
  //               : null,
  //         })
  //       }
  //     }
  //   }
  // } else {
  for (let property in data) {
    // console.log(trackProperties)
    if (!trackProperties.includes(property.toString()) && property) {
      trackProperties.push(property.toString())
      // console.log(property)
      tableHeader.push({
        key: property,
        label: property.toString(),
        customComponent:
          property === 'children'
            ? customCompChildren
            : property === 'id'
            ? customCompId
            : property === 'type'
            ? customCompType
            : property === 'createdAt'
            ? customCompTimeDate
            : property === 'updatedAt'
            ? customCompTimeDate
            : property === 'thumb'
            ? customCompThumb
            : null,
      })
      // }
      // }
    }
  }

  console.log(tableHeader, '📪')

  const tableClickHandler = (e, rowData) => {
    // console.log('cellText --> ', e.target.textContent)
    // console.log('rowData', rowData)
    open(<ContentEditModal rowData={rowData} schema={schema} />)
  }

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
              //  data in een array
              data={[data]}
              outline
              onClick={tableClickHandler}
              height={400}
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
          "Set blah to: flappie "
        ],
        "onClick": {
          "function": {
            "name": "db:set",
            "type": "function",
            "payload": {
              "type": "flappie",
              "stringie": "flipieflapflapepoa"
            }
          }
        }
      }
    }
  ]
}
 * 
*/

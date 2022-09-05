import React, { useEffect, useState } from 'react'
import { useData, useSchema, useClient } from '@based/react'
import { SchemaLeftSidebar } from './SchemaLeftSidebar'
import { SchemaRightSidebar } from './SchemaRightSidebar'
import { Landing } from './Landing'
import { FieldList } from './FieldList'
import {
  Text,
  Button,
  EditIcon,
  useLocation,
  Spacer,
  MoreIcon,
  DeleteIcon,
  ArrowRightIcon,
} from '~'
import { styled } from 'inlines'
import { useContextMenu, ContextItem } from '~'
import { removeAllOverlays } from '../Overlay'

const More = styled(MoreIcon, {
  marginRight: 16,
  marginLeft: 4,
  display: 'inline-block',
  marginBottom: -3,
  cursor: 'pointer',
  opacity: 0.6,
  '&:hover': {
    opacity: 1,
  },
})

export const SchemaEditor = () => {
  const schema = useSchema()
  const data = useData()
  const client = useClient()

  const [location] = useLocation()
  const pathArray = location.split('/')

  // console.log(pathArray)
  // console.log('data --->', data)
  // console.log('schema --->', schema)
  // console.log('schema, schema ->', schema.schema.types)
  // console.log('client -->', client)

  const name = pathArray[1]
  const description = schema?.schema?.types?.[name]?.meta?.description

  const menuItems = {}
  const types = []

  let listItemsFields = []

  if (schema.schema.types?.[name]) {
    listItemsFields.push(schema.schema.types?.[name])
  }

  let id = ''

  if (schema.schema.types) {
    for (const type in schema.schema.types) {
      if (type !== 'file') {
        types.push({
          type,
          ...schema.schema.types[type],
        })
      }
    }

    types.sort((a, b) => {
      return a.type > b.type ? 1 : -1
    })

    if (schema.schema.types.file) {
      types.push({
        type: 'file',
        system: true,
        ...schema.schema.types.file,
      })
    }
  }

  if (client.client.optsId) {
    id = `${client.client.optsId}`
  }

  if (types.length > 0) {
    types.map((v) => (menuItems[v.type] = v.type))
  }

  return (
    <div style={{ display: 'flex' }}>
      <SchemaLeftSidebar data={menuItems} />

      <div style={{ flex: 1, flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '32px',
          }}
        >
          <div>
            <Text weight={600} size={18} wrap>
              {name}{' '}
              <More
                style={{
                  display:
                    listItemsFields?.length > 0 ? 'inline-block' : 'none',
                }}
                onClick={useContextMenu(
                  () => TypeOptionsMenu(client, schema),
                  {},
                  { placement: 'left' }
                )}
              />
            </Text>
            {description && (
              <>
                <Spacer space={4} />
                <Text weight={400} size={14} color="text2">
                  {description}
                </Text>
              </>
            )}
          </div>

          {listItemsFields?.length > 0 && (
            <Button ghost icon={EditIcon}>
              Edit content
            </Button>
          )}
        </div>

        {listItemsFields?.length > 0 && (
          <FieldList listItemsFields={listItemsFields} maxItemWidth={600} />
        )}
      </div>

      {types.length < 1 && <Landing />}

      {types.length > 0 && <SchemaRightSidebar />}
    </div>
  )
}

const TypeOptionsMenu = (client, schema) => {
  const [location, setLocation] = useLocation()

  const pathArray = location.split('/')

  const name = pathArray[1]

  return (
    <>
      <ContextItem
        icon={ArrowRightIcon}
        onClick={() => {
          console.log('hello')
        }}
      >
        View Content
      </ContextItem>
      <ContextItem
        icon={DeleteIcon}
        onClick={async () => {
          if (await confirm(`Are you sure you want to remove ${name}?`)) {
            await client.removeType(name)
            removeAllOverlays()
            setLocation(`/?story=schema`)
          }
        }}
      >
        Delete
      </ContextItem>
    </>
  )
}

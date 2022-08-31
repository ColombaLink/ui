import React, { useEffect, useState } from 'react'
import { useData, useSchema, useClient } from '@based/react'
import { SchemaLeftSidebar } from './SchemaLeftSidebar'
import { SchemaRightSidebar } from './SchemaRightSidebar'
import { Landing } from './Landing'
import { FieldList } from './FieldList'
import { Text, Button, EditIcon, useLocation } from '~'

export const SchemaEditor = () => {
  const schema = useSchema()
  const data = useData()
  const client = useClient()

  const [location] = useLocation()

  const pathArray = location.split('/')

  console.log(pathArray)

  console.log('data --->', data)
  console.log('--->', schema.schema)
  console.log(client)

  const menuItems = {}
  const types = []

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
  //   console.log('types', types)

  if (types.length > 0) {
    types.map((v) => (menuItems[v.type] = v.type))
  }

  //   console.log('menuItems', menuItems)
  const listItems = ['bloweh', 'test']

  return (
    <div style={{ display: 'flex' }}>
      <SchemaLeftSidebar data={menuItems} />

      <div style={{ flex: 1, padding: '0 32px', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '32px 0px',
          }}
        >
          <Text weight={600} size={18}>
            {pathArray[1]}
          </Text>
          <Button ghost icon={EditIcon}>
            Edit content
          </Button>
        </div>

        <FieldList listItems={listItems} />
      </div>

      {types.length < 1 && <Landing />}

      {types.length > 0 && <SchemaRightSidebar />}
    </div>
  )
}

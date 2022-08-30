import React, { useEffect } from 'react'
import { useData, useSchema, useClient } from '@based/react'
import { SchemaLeftSidebar } from './SchemaLeftSidebar'
import { SchemRightSidebar } from './SchemaRightSidebar'

export const SchemaEditor = () => {
  const schema = useSchema()
  const data = useData()
  const client = useClient()

  console.log('data --->', data)
  console.log('--->', schema)
  console.log(client)

  const menuItems = {}
  const types = []

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

  console.log('types', types)

  const test = { hallo: 'yo', watup: 'watup' }

  if (types.length > 0) {
    types.map((v, i) => (menuItems[v.type] = v.type))
  }

  console.log('menuItems', menuItems)

  return (
    <div style={{ display: 'flex' }}>
      <SchemaLeftSidebar data={menuItems} />

      <div> yo</div>

      <SchemRightSidebar />
    </div>
  )
}

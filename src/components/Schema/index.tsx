import React, { CSSProperties, FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { useRoute } from 'kabouter'
import { useSchemaTypes } from '~/hooks'

export const Schema: FC<{
  db?: string
  style?: CSSProperties
}> = ({ db = 'default', style }) => {
  const route = useRoute('[type]')
  const { types, loading } = useSchemaTypes()

  const type = route.path.type

  // const path = []

  // return null
  // if (p.length) {
  //   if (loading) {
  //     return null
  //   }
  //   const { fields } = types[type]
  //   p.reduce((fields, key) => {
  //     path.push(key)
  //     const { items, values, properties } = fields[key]
  //     if (properties) {
  //       path.push('properties')
  //       return properties
  //     }
  //     if (items?.properties) {
  //       path.push('items', 'properties')
  //       return items.properties
  //     }
  //     if (values?.properties) {
  //       path.push('values', 'properties')

  //       return values.properties
  //     }
  //     console.error('something is wrong here...', p)
  //     return fields[key]
  //   }, fields)
  // }

  return (
    <div style={{ display: 'flex', flexGrow: 1, ...style }}>
      <SchemaLeft />
      {/* <SchemaMain db={db} type={String(type)} path={path} /> */}
    </div>
  )
}

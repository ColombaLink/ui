import { useClient } from '@based/react'
import React, { FC, useState } from 'react'
import { useSchemaTypes } from '~/hooks'
import { Checkbox, MoreIcon, Text, ScrollArea } from '~'
import { Fields } from './Fields'

const Header = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Text
        size="18px"
        weight="700"
        style={{
          userSelect: 'none',
          textTransform: 'capitalize',
        }}
      >
        {children}
      </Text>
      <MoreIcon
        style={{
          marginLeft: 16,
        }}
      />
    </div>
  )
}

export const SchemaMain: FC<{
  type: string
  db: string
  path?: string[]
}> = ({ type, db = 'default', path = [] }) => {
  const { loading, types } = useSchemaTypes()
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const client = useClient()

  if (loading) {
    return null
  }

  const { meta = {}, fields } = types[type] || {}
  const { name } = meta

  if (!fields) {
    return null
  }

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 24,
        paddingBottom: 64,
      }}
    >
      <Header>{name || type}</Header>
      <Checkbox
        style={{ marginTop: 36, marginBottom: 24 }}
        label="Show system fields"
        checked={includeSystemFields}
        onChange={toggleSystemFields}
      />
      <Fields
        type={type}
        fields={path.reduce((fields, key) => fields[key], fields)}
        includeSystemFields={includeSystemFields}
        onChange={(val) => {
          const update = {}
          let from = fields
          let dest = update
          let i = 0
          const l = path.length

          while (i < l) {
            const key = path[i++]
            dest[key] = { ...from[key] }
            dest = dest[key]
            from = from[key]
          }

          Object.assign(dest, val)

          console.log(JSON.stringify(update, null, 2))

          return client
            .call('basedUpdateSchema', {
              types: {
                [type]: {
                  fields: update,
                },
              },
              db,
            })
            .catch((e) => console.error('error updating schema', e))
        }}
      />
    </ScrollArea>
  )
}

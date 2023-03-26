import { useClient } from '@based/react'
import React, { FC, useState, ReactNode } from 'react'
import { useSchema } from '../useSchema'
import { Checkbox, Text, ScrollArea, useContextState, Page } from '~'
import { Fields } from './Fields'
import { Header } from './Header'
import { Footer } from './Footer'
import { getMeta } from './getMeta'
import { TypeSchema } from '../types'

export const SchemaMain: FC = () => {
  const [type] = useContextState('type', '')
  const [db] = useContextState('db', 'default')
  const [field] = useContextState<string[]>('field', [])
  const { loading, schema } = useSchema(db)
  const { types } = schema
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const client = useClient()

  if (loading) {
    return null
  }

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  const typeDef: TypeSchema = types[type] || { meta: {}, fields: {} }
  const { meta = {}, fields } = typeDef
  const { name } = meta

  if (!fields) {
    console.error('[InvalidSchema] No fields on type', type)
    return null
  }

  const typeName = name || type

  let header: ReactNode
  let footer: ReactNode

  if (field.length) {
    header = (
      <Header back>
        {getMeta(field, typeDef)?.name || field[field.length - 1]}
      </Header>
    )
    footer = <Footer name={typeName} />
  } else {
    header = <Header>{typeName}</Header>
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          paddingBottom: 64,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {header}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 660, flexGrow: 1, margin: '0 48px' }}>
            {field.length ? (
              <div style={{ marginTop: 36, marginBottom: 24, width: '100%' }} />
            ) : (
              <Checkbox
                style={{ marginTop: 36, marginBottom: 24, width: '100%' }}
                label="Show system fields"
                checked={includeSystemFields}
                onChange={toggleSystemFields}
              />
            )}
            <div>
              <Fields
                includeSystemFields={includeSystemFields}
                onChange={(val) => {
                  const update = {}
                  let from = fields
                  let dest = update
                  let i = 0
                  const l = field.length
                  while (i < l) {
                    const key = field[i++]
                    dest[key] = { ...from[key] }
                    dest = dest[key]
                    // @ts-ignore
                    from = from[key]
                  }
                  Object.assign(dest, val)

                  return client
                    .call('db:set-schema', {
                      db,
                      mutate: true,
                      schema: {
                        types: {
                          [type]: {
                            fields: update,
                          },
                        },
                      },
                    })
                    .catch((e) => console.error('error updating schema', e))
                }}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      {footer}
    </div>
  )
}
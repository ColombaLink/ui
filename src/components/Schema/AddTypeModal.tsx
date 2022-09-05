import React, { useEffect, useRef, useState } from 'react'
import { Dialog, Input, Checkbox, Button, AddIcon } from '~'
import { useObjectState } from '~/hooks'
import { useEnvSchema } from './useEnvSchema'
import safeTypeName from './safeTypeName'
import { generatePlural, setLocation } from '~/utils'
import { useSchema, useClient, useData } from '@based/react'
import { removeAllOverlays } from '../Overlay'

export const AddTypeModal = () => {
  const schema = useSchema()
  const client = useClient()
  const data = useData()

  const db = 'default'

  // console.log('---> schema', schema)
  // console.log('---> client', client)
  // console.log('----> data', data)

  const [name, setName] = useState('')
  const [pluralName, setPluralName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')
  const [opts, setOptions] = useObjectState<{
    updatedAt?: boolean
    createdAt?: boolean
  }>({
    updatedAt: true,
    createdAt: true,
  })

  return (
    <Dialog label="Create a type">
      <Input
        type="text"
        space
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(value) => {
          setName(value)
        }}
        value={name}
      />
      <Input
        type="text"
        space
        label="Plural display name"
        onChange={(value) => {
          setPluralName(value)
        }}
        value={
          pluralName ||
          (name || typeName ? generatePlural(name || typeName) : undefined)
        }
      />
      <Input
        type="text"
        space
        label="Type name"
        description="API name used in the SDK and clients"
        onChange={(value) => {
          setTypeName(safeTypeName(value))
        }}
        value={typeName || safeTypeName(name)}
      />
      <Input
        space
        label="Description"
        description="Displays a hint for content editors"
        value={description}
        onChange={(value) => {
          setDescription(value)
        }}
      />

      <Checkbox
        space="12px"
        description="Include created at field"
        checked={opts.createdAt}
        onChange={(value) => {
          setOptions({
            createdAt: value,
          })
        }}
      />
      <Checkbox
        checked={opts.updatedAt}
        description="Include last updated"
        onChange={(value) => {
          setOptions({
            updatedAt: value,
          })
        }}
      />

      <Dialog.Buttons border>
        <Button
          ghost
          outline
          color="text2"
          onClick={() => {
            removeAllOverlays()
          }}
        >
          Cancel
        </Button>
        <Button
          icon={AddIcon}
          onClick={async () => {
            if (schema) {
              if (!schema.schema.languages || !schema.schema.languages.length) {
                schema.schema.languages = ['en']
              }

              if (!schema.schema.types) {
                schema.schema.types = {}
              }

              const parsedName = typeName || safeTypeName(name)

              const type: any = {
                meta: {
                  name: name,
                  description,
                  pluralName,
                },
                fields: {},
              }

              schema.schema.types[parsedName] = type

              type.fields.name = {
                type: 'string',
                meta: {
                  index: 0,
                },
              }

              if (opts.createdAt) {
                type.fields.createdAt = {
                  type: 'timestamp',
                  meta: { index: 1 },
                }
              }

              if (opts.updatedAt) {
                type.fields.updatedAt = {
                  type: 'timestamp',
                  meta: { index: 2 },
                }
              }

              await client.updateSchema({ schema: schema.schema, db })

              if (!opts.updatedAt) {
                await client.removeField(parsedName, 'updatedAt')
              }

              if (!opts.createdAt) {
                await client.removeField(parsedName, 'createdAt')
              }

              removeAllOverlays()

              // setLocation(`/dashboard/${id}/schema?type=${parsedName}`)
            }
          }}
        >
          Create type
        </Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

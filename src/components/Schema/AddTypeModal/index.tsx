import { Input, useObjectState, Dialog, Checkbox, useLocation } from '~'
import React, { useState, FC } from 'react'
import safeTypeName from './safeTypeName'
import { generatePlural } from '~/utils'
import { useClient, useSchema } from '@based/react'

export const AddTypeModal: FC<{ hrefPrefix: string }> = ({ hrefPrefix }) => {
  const { schema } = useSchema()
  const client = useClient()
  const db = 'default' // TODO
  const [name, setName] = useState('')
  const [pluralName, setPluralName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')
  const [, setLocation] = useLocation()
  const [opts, setOptions] = useObjectState<{
    updatedAt?: boolean
    createdAt?: boolean
  }>({
    updatedAt: true,
    createdAt: true,
  })

  return (
    <Dialog label="Create a type">
      <Dialog.Body>
        <Input
          type="text"
          placeholder="Type something here"
          label="Display name"
          description="Name that will be displayed in the interface"
          onChange={(value) => {
            setName(value)
          }}
          value={name}
        />
        <Input
          type="text"
          placeholder="Type something here"
          label="Display name plural"
          description="Plurar display name"
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
          placeholder="Type something here"
          label="Type name"
          description="Api name used in the sdk and clients"
          onChange={(value) => {
            setTypeName(safeTypeName(value))
          }}
          value={typeName || safeTypeName(name)}
        />
        <Input
          multiline
          label="Description"
          description="Displays a hint for content editors"
          value={description}
          onChange={(value) => {
            setDescription(value)
          }}
        />

        {/* <div style={{ marginTop: 2 }} />

        <Checkbox
          checked={opts.createdAt}
          label="Include created at field"
          onChange={(value) => {
            setOptions({
              createdAt: value,
            })
          }}
        />
        <Checkbox
          checked={opts.updatedAt}
          label="Include last updated"
          onChange={(value) => {
            setOptions({
              updatedAt: value,
            })
          }}
        /> */}
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <Dialog.Confirm
          onConfirm={async () => {
            if (schema) {
              if (!schema.languages || !schema.languages.length) {
                schema.languages = ['en']
              }

              if (!schema.types) {
                schema.types = {}
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

              schema.types[parsedName] = type
              type.fields.name = {
                type: 'string',
                meta: {
                  index: 0,
                },
              }

              // if (opts.createdAt) {
              //   type.fields.createdAt = {
              //     type: 'timestamp',
              //     meta: { index: 1 },
              //   }
              // }

              // if (opts.updatedAt) {
              //   type.fields.updatedAt = {
              //     type: 'timestamp',
              //     meta: { index: 2 },
              //   }
              // }

              await client.updateSchema({ schema, db })

              // if (!opts.updatedAt) {
              //   await client.removeField(parsedName, 'updatedAt')
              // }

              // if (!opts.createdAt) {
              //   await client.removeField(parsedName, 'createdAt')
              // }

              setLocation(`${hrefPrefix}/${parsedName}`)
            }
          }}
        >
          Create Model (Enter)
        </Dialog.Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}

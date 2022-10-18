import { Input, Dialog, useLocation } from '~'
import React, { useState, FC } from 'react'
import safeTypeName from './safeTypeName'
import { generatePlural } from '~/utils'
import { useClient, useSchema } from '@based/react'

export const AddTypeModal: FC<{ prefix: string }> = ({ prefix }) => {
  const { schema } = useSchema()
  const client = useClient()
  const db = 'default' // TODO
  const [name, setName] = useState('')
  const [pluralName, setPluralName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')
  const [, setLocation] = useLocation()

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
          description="Plural display name"
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
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <Dialog.Confirm
          onConfirm={async () => {
            const type = typeName || safeTypeName(name)
            const typeSchema = {
              meta: {
                name: name,
                description,
                pluralName,
              },
            }
            if (schema) {
              schema.types[type] = typeSchema
            }

            await client.updateSchema({
              schema: {
                types: {
                  [type]: typeSchema,
                },
              },
              db,
            })

            setLocation(`${prefix}/${type}`)
          }}
        >
          Create Model (Enter)
        </Dialog.Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}
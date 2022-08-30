import React, { useRef } from 'react'
import { Dialog, Input, Checkbox, Button, AddIcon } from '~'
import { useClient } from '@based/react'

export const AddTypeModal = () => {
  const values = useRef({
    type: '',
    prefix: '',
    createdAt: false,
    updatedAt: false,
  })

  return (
    <Dialog label="Create a type">
      <Input
        space
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(v) => {
          if (typeof v === 'string') {
            values.current.type = v
          }
        }}
      />
      <Input
        space
        label="Plural display name"
        onChange={(v) => {
          if (typeof v === 'string') {
            values.current.prefix = v
          }
        }}
      />
      <Input
        space
        label="Type name"
        description="API name used in the sdk and clients"
      />
      <Input
        space
        label="Description"
        description="Displays a hint for content editors"
      />

      <Checkbox space="12px" description="Include created at field" />
      <Checkbox description="Include last updated" />

      <Dialog.Buttons border>
        <Button ghost outline color="text2" onClick={() => {}}>
          Cancel
        </Button>
        <Button icon={AddIcon}>Add type</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

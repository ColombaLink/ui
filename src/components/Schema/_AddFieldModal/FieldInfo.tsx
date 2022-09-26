import React, { FC } from 'react'
import { Input } from '~'
import safeTypeName from '../AddTypeModal/safeTypeName'
import { FieldOptionsState } from './types'

export const FieldInfo: FC<{
  options: FieldOptionsState
  update: (options: FieldOptionsState) => void
}> = ({ update, options }) => {
  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Type something here"
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(value: string) => {
          update({ name: value })
        }}
        value={options.name}
        style={{ marginBottom: 24 }}
      />
      <Input
        type="text"
        placeholder="Type something here"
        label="Field name"
        description="Api field - name used in the sdk and clients"
        onChange={(value: string) => {
          update({ fieldName: safeTypeName(value) })
        }}
        value={options.fieldName || safeTypeName(options.name || '')}
        style={{ marginBottom: 24 }}
      />
      <Input
        multiline // TODO no camelcase?
        label="Description (Optional)"
        description="Displays a hint for content editors"
        value={options.description}
        onChange={(value) => {
          update({ description: value })
        }}
      />
    </>
  )
}

import React, { FC } from 'react'
import { Input } from '~'
import { FieldOptionsState } from './types'
import safeTypeName from '../safeTypeName'

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
        space="20px"
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
        space="20px"
      />
      <Input
        multiline
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

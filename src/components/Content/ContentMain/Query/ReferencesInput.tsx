import React from 'react'
import { useItemSchema } from '../../hooks/useItemSchema'
import { SelectInput } from './SelectInput'

export const ReferencesInput = (props) => {
  const { fields = {}, loading } = useItemSchema(props.target)

  if (loading) return null

  return (
    <SelectInput
      // TODO remove this hack for switching targets
      key={props.target}
      {...props}
      options={Object.keys(fields).filter(
        (field) => fields[field].type === 'references'
      )}
    />
  )
}

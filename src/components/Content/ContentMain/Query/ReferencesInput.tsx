import React from 'react'
import { useItemSchema } from '../../hooks/useItemSchema'
import { SelectInput } from './SelectInput'

export const ReferencesInput = (props) => {
  const { fields = {}, loading } = useItemSchema(props.target)

  if (loading) return null

  const options = Object.keys(fields)

  return options.length ? (
    <SelectInput
      // TODO remove this hack for switching targets
      key={props.target}
      {...props}
      options={options.filter((field) => fields[field].type === 'references')}
    />
  ) : null
}

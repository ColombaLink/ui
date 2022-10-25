import React from 'react'
import { ResizableInput } from './ResizableInput'
import { SelectInput } from './SelectInput'
export const ValueInput = (props) => {
  if (props.field === 'type') {
    return (
      <SelectInput
        // TODO remove!!!
        key={props.value}
        {...props}
        options={Object.keys(props.types)}
      />
    )
  }

  return <ResizableInput {...props} />
}

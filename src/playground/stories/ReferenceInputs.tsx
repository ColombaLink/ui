import React from 'react'
import { ReferenceInput } from '~'

export const ReferenceInputs = () => {
  return (
    <div style={{ maxWidth: 720 }}>
      <ReferenceInput
        indent
        // disabled
        label="Reference"
        description="yolo"
        descriptionBottom="The label is placed below the title. Use it to show short labels such as a category."
      />
    </div>
  )
}

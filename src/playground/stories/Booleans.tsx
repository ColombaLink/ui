import React from 'react'
import { Boolean } from '~'

export const Booleans = () => {
  return (
    <div>
      <Boolean
        indent
        label="Boolean"
        // description="hello dude"
        descriptionBottom="This is descriptionBottom dude"
        error={() => {}}
      />
    </div>
  )
}

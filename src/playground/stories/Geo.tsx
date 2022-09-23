import React from 'react'
import { GeoInput } from '~'

export const Geo = () => {
  return (
    <div>
      Geo:
      <GeoInput
        label="Geo input"
        descriptionBottom="Description at the very bottom"
        indent
      />
    </div>
  )
}

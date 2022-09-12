import React from 'react'
import { DateTimePicker } from '~'

export const DateTime = () => {
  return (
    <div>
      <DateTimePicker
        label="Date time"
        description="The label is placed above the title. Use it to show short labels such as a category."
        onChange={() => {}}
      />
    </div>
  )
}

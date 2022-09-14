import React, { useState } from 'react'
import { DateTimePicker, Text } from '~'

export const DateTime = () => {
  const [valueMsc, setValueMsc] = useState<number>()

  return (
    <div>
      <div
        style={{
          border: '1px solid orange',
          width: 200,
          height: 70,
          padding: 10,
          marginBottom: 24,
        }}
      >
        Output in Milliseconds:
        <Text>{valueMsc}</Text>
      </div>

      <DateTimePicker
        space="32px"
        label="Date time"
        description="The label is placed above the title. Use it to show short labels such as a category."
        onChange={(e) => {
          //  console.log('yo', e)
          setValueMsc(e)
        }}
      />
    </div>
  )
}

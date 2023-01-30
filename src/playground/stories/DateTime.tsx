import React, { useState } from 'react'
import { DateTimePicker } from '~'
import ComponentViewer from '../ComponentViewer'

export const DateTime = () => {
  const [valueMsc, setValueMsc] = useState<number>()

  return (
    <ComponentViewer
      component={DateTimePicker}
      propsName="DateTimePickerProps"
      examples={[
        {
          props: {
            label: 'Date Range',
            dateRange: true,
            descriptionBottom: 'Onchange (e) returns value in milliseconds',
            onChange: (e) => console.log(e),
            indent: true,
            space: '32px',
            style: {
              marginBottom: 420,
            },
          },
        },
        {
          props: {
            label: 'Date / Time ',
            description: 'Optional to show time and utc',
            space: '32px',
            onChange: (e) => console.log(e),
            style: {
              marginBottom: 420,
            },
            error: (e) => {
              if (Number.isNaN(e)) {
                return 'Not a number error!'
              }
            },
          },
        },
      ]}
    />
  )
}

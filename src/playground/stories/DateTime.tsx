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
            // value: 1662656400000,
            label: 'Date Time',
            // description: 'Description',
            //   utc: true,
            dateRange: true,
            descriptionBottom: 'Onchange (e) returns value in milliseconds',
            onChange: (e) => console.log(e),
            indent: true,
            space: '32px',
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

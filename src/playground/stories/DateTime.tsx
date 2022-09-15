import React, { useState } from 'react'
import { DateTimePicker, Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const DateTime = () => {
  const [valueMsc, setValueMsc] = useState<number>()

  return (
    <>
      <ComponentViewer
        component={DateTimePicker}
        propsName="DateTimePickerProps"
        examples={[
          {
            props: {
              value: 1662974400000,
              label: 'Date Time',
              // description: 'Description',
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
      {/* <div>
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
      </div> */}
    </>
  )
}

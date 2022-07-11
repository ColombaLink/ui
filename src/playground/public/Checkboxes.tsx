import React from 'react'
import { Checkbox } from '~'
import ComponentViewer from '../ComponentViewer'
import { Text } from '~'

export const Checkboxes = () => {
  return (
    <ComponentViewer
      component={Checkbox}
      examples={[
        {
          props: {
            label: 'Checkbox label',
          },
        },
        {
          props: {
            label: 'Checkbox checked',
            checked: true,
          },
        },
        {
          props: {
            label: 'Check it out',
            checked: true,
            children: <Text weight={400}>More text content</Text>,
          },
        },
        {
          props: {
            label: 'Console log',
            onChange: () => {
              console.log('Checkbox changed')
            },
          },
        },
      ]}
    />
  )
}

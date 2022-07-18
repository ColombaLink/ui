import React from 'react'
import { Checkbox } from '~'
import ComponentViewer from '../ComponentViewer'

export const Checkboxes = () => {
  console.log('WTF')
  return (
    <ComponentViewer
      component={Checkbox}
      propsName="CheckboxProps"
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
            description: 'Checkbox description',
            checked: true,
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

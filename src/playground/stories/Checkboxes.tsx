import React from 'react'
import { Checkbox } from '~'
import ComponentViewer from '../ComponentViewer'

export const Checkboxes = () => {
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
            color: 'green',
            indeterminate: true,
          },
        },
        {
          props: {
            label: 'Check it out',
            description: 'Checkbox description',
            checked: true,
            size: 'sm',
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

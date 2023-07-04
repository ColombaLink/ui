import React from 'react'
import { Checkbox as CheckboxComponent } from '~'
import ComponentViewer from '../ComponentViewer'

export const Checkbox = () => {
  return (
    <ComponentViewer
      component={CheckboxComponent}
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
            small: true,
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

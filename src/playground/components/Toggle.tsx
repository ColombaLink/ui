import React from 'react'
import { Toggle as ToggleComponent } from '~/components/Toggle'
import ComponentViewer from '../ComponentViewer'

export const Toggle = () => {
  return (
    <ComponentViewer
      component={ToggleComponent}
      propsName="ToggleProps"
      examples={[
        {
          props: {
            label: 'One Label',
            description: 'One Description',
            text: 'One Text',
          },
        },
        {
          props: {
            text: 'checked',
            value: true,
          },
        },
      ]}
    />
  )
}

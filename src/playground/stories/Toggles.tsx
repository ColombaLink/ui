import React from 'react'
import { Toggle } from '~/components/Toggle'
import ComponentViewer from '../ComponentViewer'

export const Toggles = () => {
  return (
    <div>
      <ComponentViewer
        component={Toggle}
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
              checked: true,
            },
          },
        ]}
      />
    </div>
  )
}

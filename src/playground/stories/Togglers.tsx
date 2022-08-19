import React from 'react'
import { Toggler } from '~/components/Toggler'
import ComponentViewer from '../ComponentViewer'

export const Togglers = () => {
  return (
    <div>
      <ComponentViewer
        component={Toggler}
        propsName="TogglerProps"
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

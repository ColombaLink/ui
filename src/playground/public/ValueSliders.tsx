import React from 'react'
import { ValueSlider } from '~/components/ValueSlider'
import ComponentViewer from '../ComponentViewer'

export const Sliders = () => {
  const Items = [
    { id: 'id1', title: 'one', index: 0 },
    { id: 'id2', title: 'two', index: 1 },
    { id: 'id3', title: 'three', index: 2 },
    { id: 'id4', title: 'four', index: 3 },
  ]

  return (
    <div>
      <ComponentViewer
        component={ValueSlider}
        examples={[
          {
            props: {
              alwaysShowLabel: true,
              min: 0,
              max: 50,
              value: 20,
              onValueChange: (value) => console.log(value),
            },
          },
          {
            props: {
              alwaysShowLabel: true,
              items: Items,
              onValueChange: (value) => console.log(value),
            },
          },
        ]}
      />
    </div>
  )
}

import React from 'react'
import { Slider as SliderComponent } from '~/components/Slider'
import ComponentViewer from '../ComponentViewer'

export const Slider = () => {
  return (
    <ComponentViewer
      component={SliderComponent}
      propsName="SliderProps"
      examples={[
        {
          props: {
            alwaysShowLabel: true,
            min: 0,
            max: 50,
            value: 20,
            onChange: (value) => console.log(value),
          },
        },
        {
          props: {
            alwaysShowLabel: true,
            items: [
              { id: 'id1', title: 'one', index: 0 },
              { id: 'id2', title: 'two', index: 1 },
              { id: 'id3', title: 'three', index: 2 },
              { id: 'id4', title: 'four', index: 3 },
            ],
            onChange: (value) => console.log(value),
          },
        },
      ]}
    />
  )
}

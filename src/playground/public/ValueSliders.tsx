import React from 'react'
import { ValueSlider } from '~/components/ValueSlider'
import ComponentViewer from '../ComponentViewer'

export const Sliders = () => {
  return (
    <div>
      <ComponentViewer
        component={ValueSlider}
        examples={[
          {
            props: {},
          },
        ]}
      />

      <ValueSlider />
    </div>
  )
}

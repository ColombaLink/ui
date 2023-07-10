import React from 'react'
import { DateRangeWidget } from '~'
import ComponentViewer from '../ComponentViewer'

export const DateRange = () => {
  return (
    <ComponentViewer
      component={DateRangeWidget}
      propsName="DateRangeWidgetProps"
      examples={[
        {
          props: {
            onChange: (e) => console.log('change:', e),
            value: [1680645600000, 1681509600000],
          },
        },
      ]}
    />
  )
}

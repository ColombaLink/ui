import React from 'react'
import { DateWidget } from '~'
import ComponentViewer from '../ComponentViewer'

export const Date = () => {
  return (
    <ComponentViewer
      component={DateWidget}
      propsName="DateWidgetProps"
      examples={[
        {
          props: {
            onChange: (e) => console.log('milliseconds:', e),
            value: 1682460000000,
            time: true,
          },
        },
      ]}
    />
  )
}

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
            onChange: (e) => console.log(e),
            value: 1682460000000,
            // error: (e) => {
            //   if (Number.isNaN(e)) {
            //     return 'Not a number error!'
            //   }
            // },
            // onClose: () => console.log('closed the picker'),
          },
        },
      ]}
    />
  )
}

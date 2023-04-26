import React, { useState } from 'react'
import { Date as Datepicker } from '~'
import ComponentViewer from '../ComponentViewer'

export const Date = () => {
  return (
    <ComponentViewer
      component={Datepicker}
      propsName="DateProps"
      examples={[
        {
          props: {
            onChange: (e) => console.log(e),
            style: {
              backgroundColor: 'yellow',
            },
            value: 1682504632933,
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

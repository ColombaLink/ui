import React from 'react'
import { Spacer as Sp } from '~/components/Spacer'
import ComponentViewer from '../ComponentViewer'

export const Spacer = () => {
  return (
    <ComponentViewer
      component={Sp}
      propsName="SpacerProps"
      examples={[
        {
          props: {
            space: '36px',
            style: { backgroundColor: 'yellow', border: '1px solid red' },
          },
        },
        {
          props: {
            space: '12px',
          },
        },
      ]}
    />
  )
}

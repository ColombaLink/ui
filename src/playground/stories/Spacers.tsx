import React from 'react'
import { Container } from '~/components/Container'
import { Spacer } from '~/components/Spacer'
import ComponentViewer from '../ComponentViewer'

export const Spacers = () => {
  return (
    <ComponentViewer
      component={Spacer}
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

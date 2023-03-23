import React from 'react'
import { Separator } from '~/components/Separator'
import ComponentViewer from '../ComponentViewer'

export const Separators = () => {
  return (
    <ComponentViewer
      component={Separator}
      propsName="SeparatorProps"
      examples={[
        {
          props: {},
        },
        {
          props: {
            children: 'or',
          },
        },
        {
          props: {
            children: 'next section',
          },
        },
      ]}
    />
  )
}

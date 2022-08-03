import React from 'react'
import { Container } from '~/components/Container'
import { Separator } from '~/components/Separator'
import ComponentViewer from '../ComponentViewer'

export const Separators = () => {
  return (
    <div>
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
    </div>
  )
}

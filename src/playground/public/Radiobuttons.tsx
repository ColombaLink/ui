import React from 'react'
import { RadioButton } from '~/components/RadioButton'
import ComponentViewer from '../ComponentViewer'

export const Radiobuttons = () => {
  return (
    <div>
      <ComponentViewer
        component={RadioButton}
        examples={[
          {
            props: {
              label: 'Radio Buttons',
              description: 'Radio Buttons for you',
              data: ['Apples', 'Oranges', 'Bananas'],
            },
          },
          {
            props: {
              label: 'Radio Buttons',
              description: 'More Radio Buttons for you',
              data: ['Coffee', 'Tea', 'Cola'],
              direction: 'horizontal',
              defaultValue: 'Tea',
            },
          },
        ]}
      />
    </div>
  )
}

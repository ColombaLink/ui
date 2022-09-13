import React from 'react'
import { RadioButton } from '~/components/RadioButton'
import ComponentViewer from '../ComponentViewer'

export const Radiobuttons = () => {
  const testObjects = [
    { label: 'Appeltjes', value: 'Apples', description: 'jonagold' },
    { label: 'Sinasapple', value: 'Oranges', description: 'oranje rond fruit' },
    { label: 'Banaan', value: 'Bananas', description: 'chiquita ' },
  ]

  return (
    <div>
      <ComponentViewer
        component={RadioButton}
        propsName="RadioButtonProps"
        examples={[
          {
            props: {
              label: 'Radio Buttons',
              description: 'Radio Buttons for you',
              //  data: ['Apples', 'Oranges', 'Bananas'],
              data: testObjects,
              defaultValue: 'Bananas',
            },
          },
          {
            props: {
              label: 'Radio Buttons',
              description: 'More Radio Buttons for you',
              data: [{ value: 'Tea' }, { value: 'Coffee' }, { value: 'Water' }],
              direction: 'horizontal',
              defaultValue: 'Tea',
            },
          },
        ]}
      />
    </div>
  )
}

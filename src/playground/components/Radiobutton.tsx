import React from 'react'
import { RadioButtons } from '~/components/RadioButtons'
import ComponentViewer from '../ComponentViewer'

export const Radiobutton = () => {
  const testObjects = [
    { label: 'Appeltjes', value: 'Apples', description: 'jonagold' },
    { label: 'Sinasapple', value: 'Oranges', description: 'oranje rond fruit' },
    { label: 'Banaan', value: 'Bananas', description: 'chiquita ' },
  ]

  return (
    <div>
      <ComponentViewer
        component={RadioButtons}
        propsName="RadioButtonsProps"
        examples={[
          {
            props: {
              label: 'Radio Buttons',
              cards: true,
              data: testObjects,
              value: 'Bananas',
              direction: 'horizontal',
            },
          },
          {
            props: {
              label: 'Radio Buttons',
              description: 'Radio Buttons for you',
              indent: true,
              data: testObjects,
              value: 'Bananas',
              color: 'green',
            },
          },
          {
            props: {
              label: 'Radio Buttons',
              description: 'More Radio Buttons for you',
              data: [{ value: 'Tea' }, { value: 'Coffee' }, { value: 'Water' }],
              direction: 'horizontal',
              value: 'Tea',
            },
          },
        ]}
      />
    </div>
  )
}

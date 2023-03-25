import React from 'react'
import { ExpandableList as EL } from '~'

import ComponentViewer from '../ComponentViewer'

export const ExpandableList = () => {
  const drillDownData = []
  for (let i = 0; i < 2; i++) {
    const d = []
    for (let i = 0; i < 2; i++) {
      d.push({
        label: 'Yesh nested ' + i,
        value: ~~(Math.random() * 1e6),
        items: [
          {
            label: 'more nested ' + i,
            value: 10,
          },
        ],
      })
    }
    drillDownData.push({
      label: 'Snurpies ' + i,
      items: d,
      value: ~~(Math.random() * 1e6),
    })
  }

  const otherExample = [
    {
      label: 'USA',
      items: [
        {
          label: 'Chevy',
          items: ['Suburban', 'Camaro'],
        },
        'Ford',
        'Tesla',
      ],
    },
  ]

  return (
    <ComponentViewer
      component={EL}
      propsName="ExpandableListProps"
      examples={[
        {
          props: {
            data: otherExample,
            maxHeight: 200,
            topLeft: 'Cars from:',
          },
        },
        {
          props: {
            data: drillDownData,
            topLeft: 'What kind of Snurpies?',
            topRight: 'How many',
          },
        },
      ]}
    />
  )
}

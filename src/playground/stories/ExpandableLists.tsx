import React from 'react'
import { ExpandableList } from '~'

import ComponentViewer from '../ComponentViewer'

export const ExpandableLists = () => {
  // Example Data
  const drillDownData = []
  for (let i = 0; i < 4; i++) {
    const d = []
    for (let i = 0; i < 3; i++) {
      d.push({
        title: 'Yesh nested ' + i,
        value: ~~(Math.random() * 1e6),
        items: [
          {
            title: 'more nested ' + i,
            value: 10,
          },
        ],
      })
    }
    drillDownData.push({
      title: 'Snurpies ' + i,
      items: d,
      value: ~~(Math.random() * 1e6),
    })
  }

  const otherExample = [
    {
      id: 1,
      title: 'USA',
      items: [
        {
          id: 2,
          title: 'Chevy',
          items: [
            {
              id: 3,
              title: 'Suburban',
            },
            {
              id: 4,
              title: 'Camaro',
            },
          ],
        },
        {
          id: 5,
          title: 'Ford',
        },
      ],
    },
  ]

  return (
    <ComponentViewer
      component={ExpandableList}
      propsName="ExpandableListProps"
      examples={[
        {
          props: {
            data: drillDownData,
            height: 360,
            topLeft: 'What kind of Snurpies?',
            topRight: 'How many',
          },
        },
        {
          props: {
            data: otherExample,
            height: 360,
            topLeft: 'Cars from:',
          },
        },
      ]}
    />
  )
}

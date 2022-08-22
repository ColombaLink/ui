import React from 'react'
import { ExpandableList } from '~'

export const ExpandableLists = () => {
  // Example Data
  const drillDownData = []
  for (let i = 0; i < 12; i++) {
    const d = []
    for (let i = 0; i < 10; i++) {
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
              items: [],
            },
          ],
        },
        {
          id: 5,
          title: 'Ford',
          items: [],
        },
      ],
    },
  ]

  //     <ResultList
  //     items={drillDownData}
  //     itemProps={{
  //       id: ['id'],
  //       title: { path: ['title'] },
  //     }}
  //     label="Locations"
  //     value="Responses"
  //     />

  return (
    <div style={{ height: 340 }}>
      <ExpandableList data={drillDownData} />
    </div>
  )
}

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
    <div>
      blaafeah
      <ExpandableList />
    </div>
  )
}

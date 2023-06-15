import React from 'react'
import { DistributionGraph as Dg } from '~'
import ComponentViewer from '../ComponentViewer'

const genRandomPoints = (
  formula: (i: number) => number,
  start: number = 0,
  end: number = 50,
  step: number = 1
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
    points.push()
  }
  return points
}

global.genRandomPoints = genRandomPoints

export const DistributionGraph = () => {
  return (
    <>
      <ComponentViewer
        component={Dg}
        propsName="DistributionGraphProps"
        examples={[
          {
            code: `import { DistributionGraph } from '@based/ui'

<div style={{ height: 300 }}>
  <DistributionGraph
    data={genRandomPoints((i) =>  ~~(Math.random() * 10000 + 1000), 0, 300)}
    label="Income in euros"
  />
</div>`,
          },
        ]}
      />
    </>
  )
}

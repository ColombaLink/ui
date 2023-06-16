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

<div style={{ height: 600}}>
  <DistributionGraph
    bars={5}
    fontStyle={{
      fontSize: 20,
      fontFamily: 'courier',
      color: 'var(--green)'
    }}
    format="number-euro"
    margin={10}
    color="green"
    data={genRandomPoints((i) => (i+1) * (i+1), 0, 30000)}
    label="Income in euros"
  />
</div>`,
          },
        ]}
      />
    </>
  )
}

import React from 'react'
import { LineGraph as Lg } from '~'
import ComponentViewer from '../ComponentViewer'

const genRandomPoints = (
  formula: (i: number) => { x: number; y: number },
  start: number = 0,
  end: number = 50,
  step: number = 1
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
    points.push(formula(i))
  }
  return points
}

global.genRandomPoints = genRandomPoints

export const LineGraph = () => {
  return (
    <>
      <ComponentViewer
        component={Lg}
        propsName="LineGraphProps"
        examples={[
          {
            code: `import { LineGraph } from '@based/ui'

<div style={{ height: 300 }}>
  <LineGraph
    data={{
      en: {
        data: genRandomPoints(
          (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }),
          0,
          50000
        ),
        minMax: true,
      },
    }}
    label="Single line 50000"
  />
</div>`,
          },

          {
            code: `import { LineGraph } from '@based/ui'

<div style={{ height: 300 }}>
  <LineGraph
    data={{
      line1: {
        data: genRandomPoints(
          (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }),
          0,
          50
        ),
        fill: true,
        color: 'teal',
      },
      line2: {
        data: genRandomPoints(
          (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }),
          0,
          50
        ),
      },
    }}
    label="Two lines 50"
  />
</div>`,
          },

          {
            code: `import { LineGraph } from '@based/ui'

<div style={{ height: 300 }}>
  <LineGraph
    data={{
      en: {
        data: genRandomPoints(
          (i) => ({ x: i, y: i * i + Math.random() * 1e3 }),
          0,
          50
        ),
        color: 'teal',
      },
      nl: {
        data: genRandomPoints(
          (i) => ({ x: i, y: i * i * 1.4 + Math.random() * 1e3 }),
          0,
          40
        ),
        color: 'green',
      },
      de: {
        data: genRandomPoints(
          (i) => ({ x: i, y: i * i * 1.2 + Math.random() * 1e3 }),
          10,
          50
        ),
      },
    }}
    label="Multiline scattered"
  />
</div>`,
          },
          {
            code: `import { LineGraph } from '@based/ui'

<div style={{ height: 300 }}>
  <LineGraph
    data={{
      en: {
        data: genRandomPoints(
          (i) => ({
            x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i,
            y: Math.sin(i * 0.007) * 10 + 20 + Math.random() * 10,
          }),
          0,
          2000
        ),
      },
      pt: {
        data: genRandomPoints(
          (i) => ({
            x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i,
            y: Math.sin((i + 300) * 0.007) * 10 + 20 + Math.random() * 10,
          }),
          0,
          2000
        ),
        color: 'teal',
      },
    }}
    xFormat="date"

    label="Date multiple stepsize scatteered"
  />
</div>`,
          },
        ]}
      />
    </>
  )
}

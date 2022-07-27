import React from 'react'
import { LineGraph as LG } from '~'

import ComponentViewer from '../ComponentViewer'

export const LineGraph = () => {
  const fraction = []
  for (let i = 0; i < 200; i++) {
    fraction.push({
      x: i,
      y: Math.random(),
    })
  }

  return (
    <>
      {/* <ComponentViewer component={LG} propsName="LineGraphProps" /> */}
      <div
        style={{
          width: '100%',
          height: 150,
        }}
      >
        <LG
          legend={{
            nl: 'Netherlands',
            de: 'Germany',
            en: 'Uk',
          }}
          data={{
            en: [
              { x: 10, y: 10 },
              { x: 20, y: 30 },
              { x: 30, y: 40 },
            ],
            nl: [
              { x: 10, y: 10 },
              { x: 20, y: 30 },
              { x: 30, y: 40 },
            ],
            de: [
              {
                x: 10,
                y: 20,
              },
              { x: 20, y: 40 },
              { x: 30, y: 43 },
            ],
          }}
        />
      </div>
    </>
  )
}

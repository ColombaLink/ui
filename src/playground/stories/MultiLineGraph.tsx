import React from 'react'
import { MultiLineGraph as MLG } from '~'

const genRandomPoints = (amount: number, formula: (i: number) => number) => {
  const points = []
  for (let i = 0; i < amount; i++) {
    points.push({
      x: i,
      y: formula(i),
    })
  }
  return points
}

export const MultiLineGraph = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 24,
          // boxShadow: '0 0 0 1px red',
        }}
      >
        <MLG
          data={genRandomPoints(
            50,
            (i) => ~~(Math.random() * 10000000) + i * 100
          )}
          label="Single line 50"
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          // marginBottom: 24,
          // boxShadow: '0 0 0 1px red',
        }}
      >
        <MLG
          data={{
            line1: {
              data: genRandomPoints(
                50,
                (i) => ~~(Math.random() * 10000000) + i * 100
              ),
              fill: true,
              color: 'teal',
            },
            line2: {
              data: genRandomPoints(
                50,
                (i) => ~~(Math.random() * 10000000) + i * 100
              ),
            },
          }}
          label="Two lines 50"
        />
      </div>
    </>
  )
}

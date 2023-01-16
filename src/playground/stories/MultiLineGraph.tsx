import React from 'react'
import { MultiLineGraph as MLG } from '~'

const genRandomPoints = (
  formula: (i: number) => number,
  start: number = 0,
  end: number = 50,
  step: number = 1
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
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
      {/* <div */}
      {/*   style={{ */}
      {/*     width: '100%', */}
      {/*     height: 300, */}
      {/*     marginBottom: 24, */}
      {/*     // boxShadow: '0 0 0 1px red', */}
      {/*   }} */}
      {/* > */}
      {/*   <MLG */}
      {/*     data={genRandomPoints( */}
      {/*       (i) => ~~(Math.random() * 10000000) + i * 100, */}
      {/*       0, */}
      {/*       50 */}
      {/*     )} */}
      {/*     label="Single line 50" */}
      {/*   /> */}
      {/* </div> */}
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 24,
          // boxShadow: '0 0 0 1px red',
        }}
      >
        <MLG
          data={{
            pt: {
              data: genRandomPoints((i) => i * i + Math.random() * 1e3, 0, 50),
            },
          }}
          label="Single play"
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 24,
          // boxShadow: '0 0 0 1px red',
        }}
      >
        <MLG
          data={{
            en: {
              data: genRandomPoints((i) => i * i + Math.random() * 1e3, 0, 50),
              color: 'teal',
            },
            nl: {
              data: genRandomPoints(
                (i) => i * i * 1.4 + Math.random() * 1e3,
                0,
                40
              ),
              color: 'green',
            },
            de: {
              data: genRandomPoints(
                (i) => i * i * 1.2 + Math.random() * 1e3,
                10,
                50
              ),
            },
          }}
          label="Single line 50000"
        />
      </div>
      {/* <div */}
      {/*   style={{ */}
      {/*     width: '100%', */}
      {/*     height: 300, */}
      {/*     // marginBottom: 24, */}
      {/*     // boxShadow: '0 0 0 1px red', */}
      {/*   }} */}
      {/* > */}
      {/*   <MLG */}
      {/*     data={{ */}
      {/*       line1: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ~~(Math.random() * 10000000) + i * 100, */}
      {/*           0, */}
      {/*           50 */}
      {/*         ), */}
      {/*         fill: true, */}
      {/*         color: 'teal', */}
      {/*       }, */}
      {/*       line2: { */}
      {/*         data: genRandomPoints( */}
      {/*           0, */}
      {/*           50, */}
      {/*           (i) => ~~(Math.random() * 10000000) + i * 100 */}
      {/*         ), */}
      {/*       }, */}
      {/*     }} */}
      {/*     label="Two lines 50" */}
      {/*   /> */}
      {/* </div> */}
    </>
  )
}

import React from 'react'
import { MultiLineGraph as MLG } from '~'

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
      {/*       (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }), */}
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
      </div>
      {/* <div */}
      {/*   style={{ */}
      {/*     width: '100%', */}
      {/*     height: 300, */}
      {/*     marginBottom: 24, */}
      {/*     // boxShadow: '0 0 0 1px red', */}
      {/*   }} */}
      {/* > */}
      {/*   <MLG */}
      {/*     data={{ */}
      {/*       en: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ x: i, y: i * i + Math.random() * 1e3 }), */}
      {/*           0, */}
      {/*           50 */}
      {/*         ), */}
      {/*         color: 'teal', */}
      {/*       }, */}
      {/*       nl: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ x: i, y: i * i * 1.4 + Math.random() * 1e3 }), */}
      {/*           0, */}
      {/*           40 */}
      {/*         ), */}
      {/*         color: 'green', */}
      {/*       }, */}
      {/*       de: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ x: i, y: i * i * 1.2 + Math.random() * 1e3 }), */}
      {/*           10, */}
      {/*           50 */}
      {/*         ), */}
      {/*       }, */}
      {/*     }} */}
      {/*     label="Multiline scatteered" */}
      {/*   /> */}
      {/* </div> */}
      {/* <div */}
      {/*   style={{ */}
      {/*     width: '100%', */}
      {/*     height: 300, */}
      {/*     marginBottom: 24, */}
      {/*     // boxShadow: '0 0 0 1px red', */}
      {/*   }} */}
      {/* > */}
      {/*   <MLG */}
      {/*     data={{ */}
      {/*       en: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ */}
      {/*             x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i, */}
      {/*             y: Math.sin(i * 0.007) * 10 + 20 + Math.random() * 10, */}
      {/*           }), */}
      {/*           0, */}
      {/*           2000 */}
      {/*         ), */}
      {/*       }, */}
      {/*       pt: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ */}
      {/*             x: new Date('2020-1-1').getTime() + 20 * 60 * 60 * i, */}
      {/*             y: Math.sin((i + 300) * 0.007) * 10 + 20 + Math.random() * 10, */}
      {/*           }), */}
      {/*           0, */}
      {/*           2000 */}
      {/*         ), */}
      {/*         color: 'teal', */}
      {/*       }, */}
      {/*       // de: { */}
      {/*       //   data: genRandomPoints( */}
      {/*       //     (i) => ({ */}
      {/*       //       x: new Date('2020-1-2').getTime() + 20 * 60 * 60 * i, */}
      {/*       //       y: i * i + Math.random() * i * 1e3, */}
      {/*       //     }), */}
      {/*       //     0, */}
      {/*       //     2000 */}
      {/*       //   ), */}
      {/*       //   color: 'teal', */}
      {/*       // }, */}
      {/*     }} */}
      {/*     xFormat="date" */}
      {/*     label="Date multiple stepsize scatteered" */}
      {/*   /> */}
      {/* </div> */}
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
      {/*           (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }), */}
      {/*           0, */}
      {/*           50 */}
      {/*         ), */}
      {/*         fill: true, */}
      {/*         color: 'teal', */}
      {/*       }, */}
      {/*       line2: { */}
      {/*         data: genRandomPoints( */}
      {/*           (i) => ({ x: i, y: ~~(Math.random() * 10000000) + i * 100 }), */}
      {/*           0, */}
      {/*           50 */}
      {/*         ), */}
      {/*       }, */}
      {/*     }} */}
      {/*     label="Two lines 50" */}
      {/*   /> */}
      {/* </div> */}
    </>
  )
}

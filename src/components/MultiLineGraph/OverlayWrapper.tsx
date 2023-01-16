import React, { useState, useRef, useContext } from 'react'
import useGraphHover from '~/hooks/useGraphHover'
import useThrottledCallback from '~/hooks//useThrottledCallback'
import { Color, color, Text } from '~'
// import { GraphContext } from '.'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import {
  LineData,
  MultiLineGraphData,
  MultiLineXGraphFormat,
  Point,
} from './types'

type LegendValues = {
  key: string
  x: number
  y: number
  color?: Color
  svgX: number
  svgY: number
  valueFormat?: NumberFormat
}[]
const Legend = ({
  isHover,
  x,
  values,
}: // xInfo,
// p,
// selected,
// legend,
// isStacked,
{
  isHover: boolean
  x: number
  values: LegendValues
}) => {
  if (!values[0]?.svgX) return null
  let extraInfo = null

  // if (isStacked) {
  //   const [selectedKey, setSelected] = useState<string>('')
  //   const ctx = useContext(GraphContext)
  //   ctx.hover = setSelected

  //   extraInfo = (
  //     <div
  //       style={{
  //         marginTop: 10,
  //       }}
  //     >
  //       {selectedKey ? (
  //         <div
  //           style={{
  //             marginTop: 12,
  //             paddingTop: 12,
  //             borderTop: `1px solid ${color('border')}`,
  //           }}
  //         >
  //           <Text weight={600}>
  //             {legend ? legend[selectedKey] : selectedKey}
  //           </Text>
  //           <div
  //             style={{
  //               display: 'flex',
  //               justifyContent: 'space-between',
  //             }}
  //           >
  //             <Text>
  //               {prettyNumber(
  //                 selected.segments[selectedKey],
  //                 valueFormat || 'number-short'
  //               )}
  //             </Text>
  //             {/* @ts-ignore */}
  //             <Text color={color(baseColor)}>
  //               {Math.round(
  //                 (selected.segments[selectedKey] / selected.y) * 100
  //               )}
  //               %
  //             </Text>
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   )
  // }

  return (
    <div
      style={{
        opacity: x && isHover ? 1 : 0,
        transition: 'opacity 0.5s',
        transform: x
          ? `translate3d(${values[0].svgX}px,0px,0px)`
          : 'translate3d(0px,0px,0px)',
        width: '1px',
        height: '100%',
        backgroundColor: color('text'),
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: `translate3d(${-7.5}px, ${values[0].svgY - 7.5}px, 0px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: 15,
            border: `2px solid ${color('text')} `,
            backgroundColor: color(values[0].color || 'accent'),
            height: 15,
          }}
        />
        {values.slice(1).map((value, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              transform: `translate3d(${0}px, ${
                value.svgY - values[0].svgY
              }px, 0px)`,
              borderRadius: '50%',
              width: 15,
              border: `2px solid ${color('text')} `,
              backgroundColor: color(value.color || 'accent'),
              height: 15,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: isFlippedX ? -110 : 24,
            padding: 8,
            backgroundColor: color('background'),
            border: `1px solid ${color('border')}`,
            boxShadow: 'rgb(0 0 0 / 12%) 0px 4px 10px',
            borderRadius: 4,
            width: 'auto',
            top: -30,
            minWidth: /*isStacked*/ false && extraInfo ? 175 : 100,
            transform:
              isFlippedX && extraInfo ? 'translateX(-44%)' : 'translateX(0%)',
          }}
        >
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {/* <Text wrap>{xInfo}</Text> */}
            <Text weight={600}>
              <span style={{ color: color(values[0].color || 'accent') }}>
                &#x2022;{' '}
              </span>
              {prettyNumber(
                values[0].y,
                values[0].valueFormat || 'number-short'
              )}
            </Text>
            {values.slice(1).map((value, i) => (
              <Text key={i} weight={600}>
                <span style={{ color: color(value.color || 'accent') }}>
                  &#x2022;{' '}
                </span>
                {prettyNumber(value.y, value.valueFormat || 'number-short')}
              </Text>
            ))}
            <Text color="text2">x: {values[0].x}</Text>
            {/* {extraInfo} */}
          </div>
        </div>
      </div>
    </div>
  )
}

let isFlippedX = false

// const findClosestIndex = (lineData: LineData, target: number) => {
//   if (!lineData.points?.length) return null
//   if (lineData.points?.length === 1) return 0

//   for (let index = 0; index < lineData.points.length; index++) {
//     if (lineData.points[index].x > target) {
//       const previous = lineData.points[index - 1].x
//       const current = lineData.points[index].x
//       return Math.abs(previous - target) < Math.abs(current - target)
//         ? index - 1
//         : index
//     }
//   }
//   return lineData.points.length - 1
// }

const findPointAt = (path: SVGGeometryElement, x: number) => {
  let from = 0
  let to = path.getTotalLength()
  let current = (from + to) / 2
  let point = path.getPointAtLength(current)

  while (Math.abs(point.x - x) > 0.5) {
    if (point.x < x) from = current
    else to = current
    current = (from + to) / 2
    point = path.getPointAtLength(current)
  }

  return { point, position: current / path.getTotalLength() }
}

const getY = ({
  x,
  width,
  r,
  isHover,
  data,
  isStacked,
  legend,
  ySpread,
  lineRefs,
}: {
  x: number
  width: number
  r: React.MutableRefObject<any>
  isHover: boolean
  data: MultiLineGraphData
  isStacked: boolean
  legend: boolean
  ySpread: number
  lineRefs: { [key: string]: React.MutableRefObject<SVGGeometryElement> }
}) => {
  if (x < 0) return null

  const values = Object.keys(data)
    .reduce<LegendValues>((previous, key) => {
      if (!lineRefs[key]?.current) return previous

      const { point, position } = findPointAt(lineRefs[key].current, x)

      return previous.concat({
        key,
        x: data[key].data[Math.floor((point.x / width) * data[key].data.length)]
          .x,
        y: data[key].data[Math.floor((point.x / width) * data[key].data.length)]
          .y,
        color: data[key].color,
        svgX: point.x,
        svgY: point.y,
        valueFormat: data[key].valueFormat,
      })
    }, [])
    .sort((a, b) => b.y - a.y)

  return (
    <Legend
      // legend={legend}
      // isStacked={isStacked}
      isHover={isHover}
      x={x}
      // p={p}
      // xInfo={xInfo}
      // selected={selected}
      values={values}
    />
  )

  // // position on graph as a ratio
  // let u = x / width
  // const biggestLength = Object.keys(data).reduce(
  //   (previousValue, key) =>
  //     data[key].data.length > previousValue
  //       ? data[key].data.length
  //       : previousValue,
  //   0
  // )
  // // currentDataIndex
  // const s = Math.floor(u * biggestLength)

  // if (u < 0) {
  //   return null
  // }

  // const selected = data[Object.keys(data)[0]].data[s]

  // let curve = r.current.curve
  // if (!curve) {
  //   for (let i = 0; i < r.current.children.length; i++) {
  //     const c = r.current.children[i]
  //     if (c.getAttribute('data-custom') === 'line') {
  //       curve = c
  //       r.current.curve = c
  //       break
  //     }
  //   }
  // }
  // console.log(curve)

  // if (curve && selected) {
  //   const totalLength = curve.getTotalLength()

  //   if (!totalLength) {
  //     return null
  //   }

  //   let tries = 4
  //   let p

  //   while (tries) {
  //     p = curve.getPointAtLength(u * totalLength)
  //     if (p.x < x) {
  //       u = u * (x / p.x)
  //     } else if (p.x > x) {
  //       u = u * (x / p.x)
  //     }
  //     tries--
  //   }

  //   let xInfo

  //   if (format === 'date' || format === 'date-time-human') {
  //     xInfo = [
  //       prettyDate(selected.x, 'time-precise'),
  //       // { value: selected.x, format: 'time-precise' },
  //       ' - ',
  //       prettyDate(selected.x, 'date'),
  //       // { value: selected.x, format: 'date' },
  //     ]
  //   } else {
  //     xInfo = 'x: ' + selected.x
  //   }

  //   return (
  //     <OverlayNested
  //       legend={legend}
  //       isStacked={isStacked}
  //       isHover={isHover}
  //       x={x}
  //       p={p}
  //       xInfo={xInfo}
  //       selected={selected}
  //       valueFormat={valueFormat}
  //     />
  //   )
  // }
  return null
}

const Overlay = ({
  isHover,
  x,
  width,
  data,
  r,
  isStacked,
  legend,
  valueFormat,
  ySpread,
  lineRefs,
}: {
  isHover: boolean
  x: number
  width: number
  data: MultiLineGraphData
  r: React.MutableRefObject<any>
  isStacked: boolean
  legend: boolean
  valueFormat: NumberFormat | string
  ySpread: number
  lineRefs: { [key: string]: React.MutableRefObject<SVGGeometryElement> }
}) => {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {x
        ? getY({
            x,
            width,
            r,
            isHover,
            data,
            isStacked,
            legend,
            ySpread,
            lineRefs,
          })
        : null}
    </div>
  )
}

export default ({
  width,
  height,
  labelHeight = 0,
  labels,
  children,
  data,
  isStacked,
  legend,
  valueFormat,
  ySpread,
  lineRefs,
}) => {
  // need format
  const [mouseX, setMouseX] = useState()

  const [hover, isHover] = useGraphHover()

  const ref = useRef<any>()
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
      }}
      // @ts-ignore TODO fix
      onMouseMove={useThrottledCallback((event) => {
        const { x } = event.currentTarget.getBoundingClientRect()
        const mousePosX = event.clientX

        if (window.innerWidth - mousePosX < 200) {
          isFlippedX = true
        } else {
          isFlippedX = false
        }

        // @ts-ignore
        setMouseX(event.pageX - x)
      }, [])}
      {...hover}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <path d={`M0,0L${width},1`} stroke={color('backdrop')} />
        {labels.map((v, i) => {
          const y = (i + 1) * labelHeight
          return (
            <path
              key={i}
              d={`M0,${y}L${width},${y}`}
              stroke={color('backdrop')}
            />
          )
        })}
        {children}
      </svg>
      {/* <Overlay */}
      {/*   valueFormat={valueFormat} */}
      {/*   isStacked={isStacked} */}
      {/*   legend={legend} */}
      {/*   isHover={isHover} */}
      {/*   x={mouseX} */}
      {/*   width={width} */}
      {/*   data={data} */}
      {/*   r={ref} */}
      {/*   ySpread={ySpread} */}
      {/*   lineRefs={lineRefs} */}
      {/* /> */}
    </div>
  )
}

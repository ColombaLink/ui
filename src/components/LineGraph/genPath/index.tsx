import React from 'react'
import { Color, color } from '~/utils'
import HoverPath from '../HoverPath'
import {
  genPathCurve,
  normalLinePaths,
  normalLineWithSpreadPaths,
} from './svgFunctions'

const genPath = (
  width,
  height,
  data,
  minY,
  ySpread,
  spread,
  segments,
  baseColor: Color = 'accent',
  legend?: any
) => {
  let stepSize = width / (data.length - 1)
  const pxValue = ySpread / height

  let paths
  const points = []
  // also different for segments
  if (stepSize < 10) {
    // MAKE AVARAGES

    // 10 pixels is the smallest amount per x
    // dX is hte result of what we need to calc to get to a stepSize of 10
    const dX = 10 / stepSize
    const condenseAmount = Math.round(dX)
    stepSize = width / (Math.floor(data.length / condenseAmount) - 1)
    const mins = []
    const maxs = []
    const pointArr = {}
    let amount = 0
    let setTotal = false

    // len = 50k
    for (let i = 0; i < data.length; i += condenseAmount) {
      let total = 0
      let min: number
      let max: number
      let pointsTraversed = 0

      const segs = {}

      for (let j = 0; j < condenseAmount; j++) {
        const dataPoint: {
          x: number
          y: number
          segments?: { [key: string]: number }
        } = data[i + j]
        if (dataPoint) {
          pointsTraversed++
          const y = dataPoint.y
          if (min === undefined || y < min) {
            min = y
          }
          if (max === undefined || y > max) {
            max = y
          }

          // need to add points for all segments...
          if (segments) {
            if (dataPoint.segments) {
              for (const key in dataPoint.segments) {
                const y = dataPoint.segments[key]
                if (segs[key] === undefined) {
                  segs[key] = 0
                }
                segs[key] += y
                if (y < min) {
                  min = y
                }
                if (y > max) {
                  max = y
                }
              }
            }
          }

          total += y
        }
      }

      let prevY = 0
      for (const key in segs) {
        if (!pointArr[key]) {
          pointArr[key] = []
        }
        if (!setTotal) {
          amount++
        }
        prevY += segs[key] / pointsTraversed
        pointArr[key].push([
          stepSize * (i / condenseAmount),
          (ySpread - (prevY - minY)) / pxValue,
        ])
      }
      setTotal = true

      const newY = total / pointsTraversed
      mins.push([
        stepSize * (i / condenseAmount),
        (ySpread - (min - minY)) / pxValue,
      ])
      maxs.push([
        stepSize * (i / condenseAmount),
        (ySpread - (max - minY)) / pxValue,
      ])
      points.push([
        stepSize * (i / condenseAmount),
        (ySpread - (newY - minY)) / pxValue,
      ])
    }
    maxs.reverse()

    if (segments) {
      // STACKED
      const children = []
      let i = 0
      let prev
      for (const key in pointArr) {
        const p = genPathCurve(
          prev ? [...pointArr[key]].reverse() : pointArr[key],
          stepSize / 2
        )
        const d = prev
          ? genPathCurve(prev, stepSize / 2) +
            `L${maxs[0][0]},${pointArr[key][pointArr[key].length - 1][1]}` +
            p +
            `L${mins[0][0]},${prev[0][1]}`
          : p + `L${maxs[0][0]},${height},L${mins[0][0]},${height}`
        i++
        prev = pointArr[key]
        // add useHover
        children.push(
          <HoverPath
            // points={pointArr[key]}
            d={d}
            i={i}
            // amount={amount}
            code={key}
            key={key}
            // legend={legend}
            baseColor={baseColor}
          />
        )
      }

      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          {children}
          <path
            d={p}
            fill="none"
            // @ts-ignore
            stroke={color(baseColor)}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    } else if (spread) {
      paths = normalLineWithSpreadPaths({
        points,
        stepSize,
        baseColor,
        maxs,
        mins,
      })
    } else {
      paths = normalLinePaths({ points, stepSize, height, baseColor })
    }
  } else {
    if (segments) {
      let amount = 0
      let setTotal = false
      const pointArr = {}
      for (let i = 0; i < data.length; i++) {
        points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
        let prevY = 0
        for (const key in data[i].segments) {
          if (!pointArr[key]) {
            pointArr[key] = []
          }
          if (!setTotal) {
            amount++
          }
          prevY += data[i].segments[key]
          pointArr[key].push([
            stepSize * i,
            (ySpread - (prevY - minY)) / pxValue,
          ])
        }
        setTotal = true
      }
      const children = []
      let i = 0
      let prev
      for (const key in pointArr) {
        const p = genPathCurve(
          prev ? [...pointArr[key]].reverse() : pointArr[key],
          stepSize / 2
        )
        const d = prev
          ? genPathCurve(prev, stepSize / 2) +
            `L${width},${pointArr[key][pointArr[key].length - 1][1]}` +
            p +
            `L0,${prev[0][1]}`
          : p + `L${width},${height},L0,${height}`
        i++
        prev = pointArr[key]
        // add useHover
        children.push(
          <HoverPath
            // points={pointArr[key]}
            d={d}
            i={i}
            // amount={amount}
            code={key}
            key={key}
            // legend={legend}
            baseColor={baseColor}
          />
        )
      }

      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          {children}
          <path
            d={p}
            fill="none"
            // @ts-ignore
            stroke={color(baseColor)}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    } else {
      for (let i = 0; i < data.length; i++) {
        points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
      }
      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          <path
            d={p + `L${width},${height},L0,${height}`}
            //  fill={useColor({ color: 'primary', opacity: 0.08 })}
            // @ts-ignore
            fill={color(baseColor)}
            fillOpacity={0.08}
            // fill={'rgba(154,82,246,0.08)'}
          />
          <path
            d={p}
            fill="none"
            // @ts-ignore
            stroke={color(baseColor)}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    }
  }

  return [paths, points]
}

export { genPathCurve }

export default genPath

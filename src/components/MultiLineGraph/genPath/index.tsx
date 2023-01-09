import React from 'react'
import { Color, color } from '~/utils'
import { Point } from '../types'

export const genPathCurve = (points: [x: number, y: number][], r: number) => {
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length - 1; i++) {
    const previous = i - 1
    const next = i + 1
    const c = {
      x: points[i][0],
      y: points[i][1],
    }
    const a1 = Math.atan2(points[previous][1] - c.y, points[previous][0] - c.x)
    const a2 = Math.atan2(points[next][1] - c.y, points[next][0] - c.x)
    const x1 = c.x + r * Math.cos(a1)
    const y1 = c.y + r * Math.sin(a1)
    const x2 = c.x + r * Math.cos(a2)
    const y2 = c.y + r * Math.sin(a2)
    d += 'L' + x1 + ',' + y1 + ' Q' + c.x + ',' + c.y + ' ' + x2 + ',' + y2
  }
  return (d += `L${points[points.length - 1][0]},${
    points[points.length - 1][1]
  }`)
}

const makeLine = ({
  data,
  width,
  height,
  stepSize,
  ySpread,
  minY,
  pxValue,
  baseColor,
}: {
  data: Point[]
  width: number
  height: number
  stepSize: number
  ySpread: number
  minY: number
  pxValue: number
  baseColor: Color
}) => {
  const points: [x: number, y: number][] = []
  for (let i = 0; i < data.length; i++) {
    points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
  }
  console.log({ minY })
  const p = genPathCurve(points, stepSize / 2)
  return (
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
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="red" />
      ))}
    </>
  )
}

export const genPath = ({
  data,
  width,
  height,
  ySpread,
  minY,
  baseColor,
}: {
  data: Point[]
  width: number
  height: number
  ySpread: number
  minY: number
  baseColor: Color
}) => {
  let stepSize = width / (data.length - 1)
  const pxValue = ySpread / height

  return makeLine({
    data,
    width,
    height,
    stepSize,
    pxValue,
    ySpread,
    minY,
    baseColor,
  })
}

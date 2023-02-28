import React from 'react'
import HoverPath from '../HoverPath'
import { Color, color } from '~/utils'
import { DataItem } from '../types'

type Point = [x: number, y: number]

export const genPathCurve = (points: Point[], r: number) => {
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

export const normalLinePaths = ({
  points,
  stepSize,
  height,
  baseColor,
}: {
  points: Point[]
  stepSize: number
  height: number
  baseColor: Color
}) => {
  // NORMAL LINE

  const p = genPathCurve(points, stepSize / 2)

  return (
    <>
      <path
        d={
          p +
          `L${points[points.length - 1][0]},${points[points.length - 1][1]}L${
            points[points.length - 1][0]
          },${height},L0,${height}`
        }
        fill={color(baseColor)}
        fillOpacity={0.08}
        //  fill={'rgba(154,82,246,0.08)'}
      />
      <path
        d={p}
        fill="none"
        // @ts-ignore
        data="line"
        // @ts-ignore
        stroke={color(baseColor)}
        strokeWidth={2}
      />
    </>
  )
}

export const normalLineWithSpreadPaths = ({
  points,
  stepSize,
  baseColor,
  maxs,
  mins,
}: {
  points: Point[]
  stepSize: number
  baseColor: Color
  maxs: Point[]
  mins: Point[]
}) => {
  // WITH SPREAD
  const p = genPathCurve(points, stepSize / 2)
  return (
    <>
      <path
        d={
          genPathCurve(mins, stepSize / 2) +
          `\nL${maxs[0][0]},${maxs[0][1]}` +
          genPathCurve(maxs, stepSize / 2) +
          `\nL${mins[0][0]},${mins[0][1]}`
        }
        // fill={'rgba(154,82,246,0.08)'}
        //  fill={useColor({ color: 'primary', opacity: 0.08 })}
        // @ts-ignore
        fill={color(baseColor)}
        fillOpacity={0.08}
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

export const normalLineWithSegments = ({
  points,
  pointArr,
  stepSize,
  height,
  baseColor,
  maxs,
  mins,
}: {
  points: Point[]
  pointArr: { [key: string]: Point[] }
  stepSize: number
  height: number
  baseColor: Color
  maxs: Point[]
  mins: Point[]
}) => {
  // STACKED
  const children = []
  let i = 0
  let prev: Point[]
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
  return (
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
}

type DataItemWithSegments = DataItem & { segments: { [key: string]: number } }
export const bigStepSizeLineWithSegments = ({
  points,
  data,
  stepSize,
  ySpread,
  minY,
  pxValue,
  width,
  height,
  baseColor,
}: {
  points: Point[]
  data: DataItemWithSegments[]
  stepSize: number
  ySpread: number
  minY: number
  pxValue: number
  width: number
  height: number
  baseColor: Color
}) => {
  const pointArr = {}
  for (let i = 0; i < data.length; i++) {
    points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
    let prevY = 0
    for (const key in data[i].segments) {
      if (!pointArr[key]) {
        pointArr[key] = []
      }
      prevY += data[i].segments[key]
      pointArr[key].push([stepSize * i, (ySpread - (prevY - minY)) / pxValue])
    }
  }
  const children = []
  let i = 0
  let prev: DataItemWithSegments
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
  return (
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
}

export const bigStepSizeLine = ({
  data,
  points,
  stepSize,
  ySpread,
  minY,
  pxValue,
  width,
  height,
  baseColor,
}: {
  points: Point[]
  data: DataItemWithSegments[]
  stepSize: number
  ySpread: number
  minY: number
  pxValue: number
  width: number
  height: number
  baseColor: Color
}) => {
  for (let i = 0; i < data.length; i++) {
    points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
  }
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
    </>
  )
}

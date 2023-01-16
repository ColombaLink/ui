import React, { useRef } from 'react'
import { Color, color } from '~/utils'
import { MultiLineGraphData, Point } from './types'
import { getGlobalMinMax } from './utils'

export const genPathCurve = (points: Point[], r: number) => {
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length - 1; i++) {
    const previous = i - 1
    const next = i + 1
    const c = {
      x: points[i].x,
      y: points[i].y,
    }
    const a1 = Math.atan2(points[previous].y - c.y, points[previous].x - c.x)
    const a2 = Math.atan2(points[next].y - c.y, points[next].x - c.x)
    const x1 = c.x + r * Math.cos(a1)
    const y1 = c.y + r * Math.sin(a1)
    const x2 = c.x + r * Math.cos(a2)
    const y2 = c.y + r * Math.sin(a2)
    d += 'L' + x1 + ',' + y1 + ' Q' + c.x + ',' + c.y + ' ' + x2 + ',' + y2
  }
  return (d += `L${points[points.length - 1].x},${points[points.length - 1].y}`)
}

const makeLine = ({
  points,
  fill,
  width,
  height,
  stepSize,
  baseColor,
}: {
  points: Point[]
  fill: boolean
  width: number
  height: number
  stepSize: number
  baseColor: Color
}) => {
  // const points: [x: number, y: number][] = []
  // for (let i = 0; i < data.length; i++) {
  //   points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
  // }
  const lineRef = useRef<SVGGeometryElement>()
  const p = genPathCurve(points, stepSize / 2)
  return {
    path: (
      <>
        {fill ? (
          <path
            d={p + `L${width},${height},L0,${height}`}
            fill={color(baseColor)}
            fillOpacity={0.08}
          />
        ) : null}
        <path
          ref={lineRef}
          d={p}
          fill="none"
          stroke={color(baseColor)}
          // TODO: Is this needed?
          data-custom="line"
          strokeWidth={2}
        />
        {false
          ? points.map(({ x, y }, i) => (
              <circle key={i} cx={x} cy={y} r="2" fill="red" />
            ))
          : null}
      </>
    ),
    lineRef,
  }
}

export const genPaths = ({
  data,
  width,
  height,
}: {
  data: MultiLineGraphData
  width: number
  height: number
}) => {
  const lineRefs: {
    [key: string]: React.MutableRefObject<SVGGeometryElement>
  } = {}

  const { globalMaxX, globalMinX, globalMaxY, globalMinY } =
    getGlobalMinMax(data)
  const xSpread = globalMaxX - globalMinX
  const ySpread = globalMaxY - globalMinY

  Object.keys(data).forEach((key) => {
    const paddingLeft = (data[key].minX - globalMinX) / xSpread
    const paddingRight = (globalMaxX - data[key].maxX) / xSpread
    const lineWidth =
      width -
      Math.abs(
        (width - xSpread) * paddingLeft - (width - xSpread) * paddingRight
      )
    const lineStepSize = lineWidth / (data[key].data.length - 1)

    data[key].stepSize = lineStepSize

    // let stepSize = width / (data[key].data.length - 1)
    const pxValue = ySpread / height
    const targetStepSize = 10

    // TODO: this needs to be done before min max
    if (lineStepSize < targetStepSize) {
      // const { data: newData, stepSize: newStepSize } = averageData({
      //   data: data[key].data,
      //   stepSize,
      //   width: svgWidth,
      //   targetStepSize,
      // })
      // data[key].data = newData
      // stepSize = newStepSize
    }
    data[key].points = data[key].data.map((dataItem, index) => {
      return {
        x: paddingLeft * width + lineStepSize * index,
        y: (ySpread - (dataItem.y - globalMinY)) / pxValue,
      }
    })
  })

  return {
    paths: Object.keys(data).map((key, i) => {
      if (!data[key].points.length) return null
      const { path, lineRef } = makeLine({
        points: data[key].points,
        fill: data[key].fill,
        width,
        height,
        stepSize: data[key].stepSize,
        baseColor: data[key].color || 'accent',
      })
      lineRefs[key] = lineRef
      return <g key={i}>{path}</g>
    }),
    lineRefs,
  }
}

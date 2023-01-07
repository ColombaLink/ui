import { Color } from '~/utils'
import { DataItem } from '../types'
import {
  bigStepSizeLine,
  bigStepSizeLineWithSegments,
  genPathCurve,
  normalLinePaths,
  normalLineWithSegments,
  normalLineWithSpreadPaths,
} from './svgFunctions'

const genPath = (
  width: number,
  height: number,
  data: DataItem[],
  minY: number,
  ySpread: number,
  spread: boolean,
  segments: boolean,
  baseColor: Color = 'accent'
) => {
  let stepSize = width / (data.length - 1)
  const pxValue = ySpread / height

  let paths: JSX.Element
  const points = []
  // also different for segments
  console.log({ stepSize })
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
        prevY += segs[key] / pointsTraversed
        pointArr[key].push([
          stepSize * (i / condenseAmount),
          (ySpread - (prevY - minY)) / pxValue,
        ])
      }

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
      paths = normalLineWithSegments({
        points,
        pointArr,
        stepSize,
        height,
        baseColor,
        mins,
        maxs,
      })
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
      paths = bigStepSizeLineWithSegments({
        points,
        data,
        stepSize,
        ySpread,
        minY,
        pxValue,
        width,
        height,
        baseColor,
      })
    } else {
      paths = bigStepSizeLine({
        data,
        points,
        stepSize,
        ySpread,
        minY,
        pxValue,
        width,
        height,
        baseColor,
      })
    }
  }

  return [paths, points]
}

export { genPathCurve }

export default genPath

import {
  LineData,
  MultiLineGraphData,
  MultiLineGraphDataInput,
  Point,
} from './types'

export const getMinMax = (data: MultiLineGraphData) => {
  let maxY: number
  let minY: number
  let maxX: number
  let minX: number

  for (const key in data) {
    for (let i = 0; i < data[key].data.length; i++) {
      const { x, y } = data[key].data[i]
      if (maxY === undefined || y > maxY) {
        maxY = y
      }
      if (minY === undefined || y < minY) {
        minY = y
      }
      if (maxX === undefined || x > maxX) {
        maxX = x
      }
      if (minX === undefined || x < minX) {
        minX = x
      }
    }
  }
  return { minX, maxX, minY, maxY }
}

export const averageData = ({
  data,
  stepSize,
  width,
  targetStepSize = 10,
}: {
  data: Point[]
  stepSize: number
  width: number
  targetStepSize?: number
}) => {
  // =======>>>>>
  // Needs to find mins and maxs
  const dX = targetStepSize / stepSize
  const condenseAmount = Math.round(dX)
  const newStepSize = width / (Math.floor(data.length / condenseAmount) - 1)
  const newData: Point[] = []

  for (let i = 0; i < data.length - 1; i += condenseAmount) {
    let totalX = 0
    let totalY = 0
    let pointsTraversed = 0

    for (let j = 0; j < condenseAmount; j++) {
      if (data[i + j]) {
        pointsTraversed++
        totalX += data[i + j].x
        totalY += data[i + j].y
      }
    }

    newData.push({
      x: totalX / pointsTraversed,
      y: totalY / pointsTraversed,
    })
  }
  return { data: newData, stepSize: newStepSize }
}

export const getGlobalMinMax = (data: MultiLineGraphData) => ({
  globalMinX: Math.min(...Object.values(data).map((l) => l.minX)),
  globalMaxX: Math.max(...Object.values(data).map((l) => l.maxX)),
  globalMinY: Math.min(...Object.values(data).map((l) => l.minY)),
  globalMaxY: Math.max(...Object.values(data).map((l) => l.maxY)),
})

export const processData = ({
  dataInput,
}: {
  dataInput: MultiLineGraphDataInput
}) => {
  // Unify data format
  let data: MultiLineGraphData
  if (Array.isArray(dataInput)) {
    data = { '': { data: dataInput } }
  } else if (Array.isArray(dataInput[Object.keys(dataInput)[0]])) {
    data = Object.keys(dataInput).reduce(
      (newData, key) => ({ ...newData, [key]: { data: dataInput[key] } }),
      {}
    )
  } else {
    data = dataInput as MultiLineGraphData
  }

  // calculate mins and maxs
  for (const key in data) {
    let minX: number
    let maxX: number
    let minY: number
    let maxY: number
    for (let i = 0; i < data[key].data.length; i++) {
      const { x, y } = data[key].data[i]
      if (maxY === undefined || y > maxY) {
        maxY = y
      }
      if (minY === undefined || y < minY) {
        minY = y
      }
      if (maxX === undefined || x > maxX) {
        maxX = x
      }
      if (minX === undefined || x < minX) {
        minX = x
      }
    }
    data[key].minX = minX
    data[key].maxX = maxX
    data[key].minY = minY
    data[key].maxY = maxY
  }
  return data
}

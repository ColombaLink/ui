import { MultiLineGraphData } from './types'

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

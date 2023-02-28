export type DataItem = { x: number; y: number }

export type LineGraphData = {
  x: number
  y: number
}[]

export type StackedLineGraphData = {
  [key: string]: {
    x: number
    y: number
  }[]
}

export type MultiLineGraphGraphData = {
  [key: string]: LineGraphData | StackedLineGraphData
}

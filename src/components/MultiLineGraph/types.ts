import { DateFormat } from '@based/pretty-date'
import { NumberFormat } from '@based/pretty-number'

export type Point = { x: number; y: number }

export type LineData = {
  data: Point[]
}

export type MultiLineGraphData = {
  [key: string]: LineData
}

export type MultiLineGraphDataInput =
  | MultiLineGraphData
  | Point[]
  | {
      [key: string]: Point[]
    }

export type MultiLineGraphFormat =
  | 'date'
  | 'number'
  | 'date-time-human'
  | NumberFormat
  | DateFormat

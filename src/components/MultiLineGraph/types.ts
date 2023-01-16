import { DateFormat } from '@based/pretty-date'
import { NumberFormat } from '@based/pretty-number'
import { Color } from '~'

export type Point = { x: number; y: number }

export type LineDataInput = {
  data: Point[]
  fill?: boolean
  color?: Color
  valueFormat?: NumberFormat
}
export type LineData = LineDataInput & {
  points?: Point[]
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
  stepSize?: number
}

export type MultiLineGraphData = {
  [key: string]: LineData
}

export type MultiLineGraphDataInput =
  | Point[]
  | { [key: string]: LineDataInput | Point[] }

export type MultiLineXGraphFormat =
  | 'date'
  | 'number'
  | 'date-time-human'
  | NumberFormat
  | DateFormat
  | false
  | null

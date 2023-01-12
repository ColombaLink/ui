import { DateFormat } from '@based/pretty-date'
import { NumberFormat } from '@based/pretty-number'
import { Color } from '~'

export type Point = { x: number; y: number }

export type LineData = {
  data: Point[]
  fill?: boolean
  color?: Color
  points?: Point[]
  valueFormat?: NumberFormat
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
  | false
  | null

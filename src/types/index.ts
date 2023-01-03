import {
  ReactChild,
  ReactChildren,
  ComponentType,
  ReactText,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
  SVGProps,
} from 'react'

import { IconProps } from '../components/Icon'
export type { Color, ColorVariant, AccentColor } from '../utils/color'

type SizeInt =
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 18
  | 20
  | 22
  | 24
  | 32
  | 36
  | 40
  | 48
  | 64
export type Size = `${SizeInt}px` | SizeInt

type WeightInt = 400 | 500 | 600 | 700
export type Weight = WeightInt | `${WeightInt}`

export type Typo =
  | 'title1'
  | 'title2'
  | 'subtitle600'
  | 'subtitle500'
  | 'subtitle400'
  | 'subtext600'
  | 'subtext500'
  | 'subtext400'
  | 'body600'
  | 'body500'
  | 'body400'
  | 'caption600'
  | 'caption500'
  | 'caption400'

type SpaceInt = 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 48
export type Space = SpaceInt | `${SpaceInt}px` | true

export type Icon = SVGProps<SVGSVGElement> & IconProps

export type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>

export type Key =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'

export type Data<T = {}> = T & {
  data: any
  index?: number
  exportData?: ExportData
}

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>

export type Children<T = PropsWithChildren<any>> =
  | ReactChild
  | ReactChildren
  | ComponentType<T>
  | ReactText
  | ReactText[]
  | ReactNode
  | ReactNode[]
  | number
  | string
  | number[]
  | string[]

export type ExportedData = {
  file?: {
    value: any
    name: string
    mime: string
  }
  text?: string
}

export type DataPath = (string | number)[]

export type DataEventHandler<T = {}> = (
  e?: Event | SyntheticEvent,
  data?: Data<T>
) => void | Promise<void> | boolean | Promise<boolean>

export type MultiDataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>[]
) => void | Promise<void>

export type File = {
  content: any
  mime: string
  name: string
}

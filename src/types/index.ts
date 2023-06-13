import { SyntheticEvent, SVGProps } from 'react'

import { IconProps } from '../components/Icon'
export type { Color, ColorVariant, AccentColor } from '../utils/color'

type SizeInt =
  | 8
  | 9
  | 10
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

export type Typography =
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

export type Icon = SVGProps<SVGSVGElement> & IconProps

export type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>

type Char =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '`'
  | '§'
  | ','
  | '.'
  | '/'
  | ';'
  | "'"
  | '\\'
  | '['
  | ']'
  | '-'
  | '='

export type InputKey =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'
  | Char

export type ModKeys = `Cmd` | `Alt` | `Shift`

type DoubleMod<M extends ModKeys> = `${M}+${Exclude<ModKeys, M>}+${InputKey}`

export type Key =
  | InputKey
  | `${ModKeys}+${InputKey}`
  | DoubleMod<'Cmd'>
  | DoubleMod<'Alt'>
  | DoubleMod<'Shift'>

export type Data<T = {}> = T & {
  data: any
  index?: number
  exportData?: ExportData
}

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>

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

import { SVGProps, SyntheticEvent } from 'react'
import { IconProps } from '../components/Icon'
export type { Color, ColorVariant, AccentColor } from '../utils/color'

type SizeInt = 11 | 12 | 13 | 14 | 15 | 16 | 18 | 20 | 24 | 32
export type Size = `${SizeInt}px` | SizeInt

type WeightInt = 400 | 500 | 600 | 700
export type Weight = WeightInt | `${WeightInt}`

type SpaceInt = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32
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

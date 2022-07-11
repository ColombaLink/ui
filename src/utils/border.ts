import type { Color, ColorVariant } from '~/types'
import { color } from './color'

export const border = (
  width,
  colorProp: Color = 'border',
  variant?: ColorVariant,
  light?: boolean
) => (width ? `${width}px solid ${color(colorProp, variant, light)}` : null)

import type { Color, Size, Weight, ColorVariant } from '~/types'
import { color } from './color'

type FontOps = {
  size?: Size
  color?: Color
  weight?: Weight
  variant?: ColorVariant
}

export const font = ({
  size = '15px',
  color: colorProp = 'text',
  weight,
  variant,
}: FontOps = {}) => {
  const fontSize = parseInt(size as string)
  const fontWeight = weight
    ? Number(weight)
    : fontSize >= 32
    ? 700
    : fontSize >= 20
    ? 600
    : 500
  const lineHeight =
    fontSize > 14 ? `${Math.max(24, fontSize * 1.167)}px` : '16px'

  return {
    fontSize,
    lineHeight,
    fontWeight,
    color: color(colorProp, variant),
  }
}

import type { Color, Size, Weight } from '~/types'
import { color } from './color'

export const font = (
  size: Size = '15',
  colorProp: Color = 'TextPrimary',
  weight?: Weight
) => {
  const fontSize = Number(size)
  const fontWeight = weight
    ? Number(weight)
    : fontSize >= 32
    ? 700
    : fontSize >= 20
    ? 600
    : 500

  const lineHeight = `${fontSize >= 24 ? fontSize : fontSize >= 15 ? 24 : 16}px`
  return {
    fontSize,
    lineHeight,
    fontWeight,
    color: color(colorProp),
  }
}

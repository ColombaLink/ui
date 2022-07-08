import type { Color, Size, Weight } from '~/types'
import { color } from './color'

export const font = ({
  size = '15px',
  color: colorProp = 'text',
  weight,
  secondary,
  active,
}: {
  size: '15px'
  color: string
  secondary: boolean
  active: boolean
  weight?: Weight
}) => {
  const fontSize = parseInt(size as string)
  const fontWeight = weight
    ? Number(weight)
    : fontSize >= 32
    ? 700
    : fontSize >= 20
    ? 600
    : 500

  const lineHeight =
    fontSize === 32
      ? '38px'
      : `${fontSize >= 24 ? fontSize : fontSize >= 15 ? 24 : 16}px`

  return {
    fontSize,
    lineHeight,
    fontWeight,
    color: color(
      colorProp,
      secondary ? 'secondary' : null,
      active ? 'active' : null
    ),
  }
}

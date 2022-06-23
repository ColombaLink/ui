import type { Color, Size } from '~/types'
import { color } from './color'

export const font = (
  size: Size = 'md',
  colorProp: Color | string = 'TextPrimary',
  weight = 500
) => {
  return {
    fontSize: `var(--size-${size})`,
    lineHeight: `var(--line-${size})`,
    fontWeight: weight,
    color: color(colorProp),
  }
}

import React, { FC, CSSProperties } from 'react'
import { Size, Color } from '~/types'
import { font } from '~/utils'

export const Text: FC = ({
  style,
  size = 'md',
  color: colorProp = 'TextPrimary',
  weight,
  italic = false,
  ...props
}: {
  size?: Size
  color?: Color
  weight?: number
  style?: CSSProperties
  italic?: boolean
}) => {
  const s = font(size, colorProp, weight) as CSSProperties
  if (italic) {
    s.fontStyle = 'italic'
  }
  if (style) {
    Object.assign(s, style)
  }
  return <div style={s} {...props} />
}

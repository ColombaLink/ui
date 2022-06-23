import React, { FC, CSSProperties } from 'react'
import { Size, Color } from '~/types'
import { font } from '~/utils'

type TextProps = {
  size?: Size
  color?: Color | string
  weight?: number
  style?: CSSProperties
  italic?: boolean
  selectable?: boolean
  wrap?: boolean
}

export const Text: FC = ({
  style,
  size = 'md',
  color: colorProp = 'TextPrimary',
  weight,
  italic = false,
  selectable = false,
  wrap = false,
  ...props
}: TextProps) => {
  const s = font(size, colorProp, weight) as CSSProperties
  s.userSelect = selectable ? 'text' : 'none'
  if (!wrap) {
    s.textOverflow = 'ellipsis'
    s.overflow = 'hidden'
    s.whiteSpace = 'nowrap'
  }
  if (italic) {
    s.fontStyle = 'italic'
  }
  if (style) {
    Object.assign(s, style)
  }
  return <div style={s} {...props} />
}

import React, { FC, CSSProperties } from 'react'
import { Size, Color } from '~/types'
import { font } from '~/utils'

export const Text: FC<{
  color: Color
  italic: boolean
  selectable: boolean
  size: Size
  style
  weight: number
  wrap: boolean
}> = ({
  color: colorProp = 'TextPrimary',
  italic = false,
  selectable = false,
  size = 'md',
  style,
  weight = 400,
  wrap = false,
  ...props
}) => {
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

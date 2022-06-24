import React, { FC, CSSProperties } from 'react'
import { Size, Color } from '~/types'
import { font } from '~/utils'

type TextProps = {
  size?: Size
  color?: Color
  weight?: number
  style?: CSSProperties
  italic?: boolean
  selectable?: boolean
  wrap?: boolean
  children?: React.ReactNode
}

export const Text: FC<TextProps> = ({
  color: colorProp = 'TextPrimary',
  italic = false,
  selectable = false,
  size = 'md',
  style,
  weight = 400,
  wrap = false,
  children,
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
  return (
    <div style={s} {...props}>
      {children}
    </div>
  )
}

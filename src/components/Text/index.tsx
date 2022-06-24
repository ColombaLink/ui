import React, { FC, CSSProperties } from 'react'
import { Size, Color, Weight } from '~/types'
import { font } from '~/utils'

type TextProps = {
  size?: Size
  color?: Color
  weight?: Weight
  style?: CSSProperties
  italic?: boolean
  selectable?: boolean
  wrap?: boolean
  children?: React.ReactNode
  space?: boolean | string | number
}

export const Text: FC<TextProps> = ({
  color: colorProp = 'TextPrimary',
  italic,
  selectable,
  size,
  style,
  weight,
  wrap,
  children,
  space,
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
  if (space) {
    // TODO add options
    s.marginBottom = 24
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

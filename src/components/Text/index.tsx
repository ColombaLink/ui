import React, { FC, CSSProperties } from 'react'
import { Size, Color, Weight, Space } from '~/types'
import { font, spaceToPx } from '~/utils'

type TextProps = {
  size?: Size
  space?: Space
  color?: Color | string
  weight?: Weight
  style?: CSSProperties
  italic?: boolean
  selectable?: boolean
  wrap?: boolean
  children?: React.ReactNode
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
    s.marginBottom = spaceToPx(space)
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

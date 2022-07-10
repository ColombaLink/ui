import React, { FC, CSSProperties, ReactNode } from 'react'
import { Size, Color, Weight, Space, ColorVariant } from '~/types'
import { font, spaceToPx } from '~/utils'

type TextProps = {
  size?: Size
  space?: Space
  color?: Color
  weight?: Weight
  style?: CSSProperties
  italic?: boolean
  selectable?: boolean
  wrap?: boolean
  variant?: ColorVariant
  children: ReactNode
}

export const Text: FC<TextProps> = ({
  color = 'text',
  italic,
  selectable,
  size,
  style,
  weight,
  wrap,
  children,
  space,
  variant,
  ...props
}) => {
  const s = font({ size, color, variant, weight }) as CSSProperties

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

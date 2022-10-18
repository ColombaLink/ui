import React, { FC, CSSProperties, ReactNode } from 'react'
import { Size, Color, Weight, Space, ColorVariant } from '~/types'
import { font, spaceToPx } from '~/utils'

type TextProps = {
  capitalize?: boolean
  children: ReactNode
  color?: Color
  italic?: boolean
  onClick?: (e) => void
  selectable?: boolean
  size?: Size
  space?: Space
  style?: CSSProperties
  textAlign?: 'center' | 'right' | 'left'
  variant?: ColorVariant
  weight?: Weight
  wrap?: boolean
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
  textAlign,
  capitalize,
  onClick,
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

  if (textAlign) {
    s.textAlign = textAlign
  }

  if (capitalize) {
    s.textTransform = 'capitalize'
  }

  if (style) {
    Object.assign(s, style)
  }

  return (
    <div style={s} {...props} onClick={onClick}>
      {children}
    </div>
  )
}

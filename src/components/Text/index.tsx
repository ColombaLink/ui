import React, { FC, CSSProperties, ReactNode, MouseEvent } from 'react'
import { Size, Color, Weight, Space, ColorVariant, Typography } from '~/types'
import { font, spaceToPx } from '~/utils'

type TextProps = {
  capitalize?: boolean
  children: ReactNode
  color?: Color
  italic?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onDoubleClick?: (e: MouseEvent<HTMLDivElement>) => void
  selectable?: boolean
  size?: Size
  space?: Space
  style?: CSSProperties
  textAlign?: 'center' | 'right' | 'left'
  variant?: ColorVariant
  weight?: Weight
  wrap?: boolean
  typography?: Typography
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
  typography,
  ...props
}) => {
  const s = font({ size, color, variant, weight }) as CSSProperties

  s.userSelect = selectable ? 'text' : 'none'

  s.letterSpacing = '-0.015em'
  s.fontSize = size || '14px'
  s.fontWeight = weight || '500'
  s.lineHeight = size
    ? typeof size === 'string'
      ? ~~(parseInt(size) * 1.42) + 'px'
      : ~~(size * 1.42) + 'px'
    : '20px'

  if (!wrap) {
    s.textOverflow = 'ellipsis'
    s.overflowY = 'hidden'
    s.overflowX = 'hidden'
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

  // typo styles
  if (typography === 'title1') {
    s.fontWeight = 700
    s.fontSize = '36px'
    s.lineHeight = '60px'
  }
  if (typography === 'title2') {
    s.fontWeight = 700
    s.fontSize = '22px'
    s.lineHeight = '32px'
  }
  if (typography === 'subtitle600') {
    s.fontWeight = 600
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typography === 'subtitle500') {
    s.fontWeight = 500
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typography === 'subtitle400') {
    s.fontWeight = 400
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typography === 'subtext600') {
    s.fontWeight = 600
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typography === 'subtext500') {
    s.fontWeight = 500
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typography === 'subtext400') {
    s.fontWeight = 400
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typography === 'body600') {
    s.fontWeight = 600
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typography === 'body500') {
    s.fontWeight = 500
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typography === 'body400') {
    s.fontWeight = 400
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typography === 'caption600') {
    s.fontWeight = 600
    s.fontSize = '12px'
    s.lineHeight = '16px'
  }
  if (typography === 'caption500') {
    s.fontWeight = 500
    s.fontSize = '12px'
    s.lineHeight = '16px'
  }
  if (typography === 'caption400') {
    s.fontWeight = 400
    s.fontSize = '12px'
    s.lineHeight = '16px'
  }

  // if (size) {
  //   s.fontSize = `${size}px`
  // }

  return (
    <div style={s} {...props} onClick={onClick}>
      {children}
    </div>
  )
}

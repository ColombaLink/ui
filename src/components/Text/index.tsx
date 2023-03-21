import React, { FC, CSSProperties, ReactNode, MouseEvent } from 'react'
import { Size, Color, Weight, Space, ColorVariant, Typo } from '~/types'
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
  typo?: Typo
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
  typo,
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

  // typo styles
  if (typo === 'title1') {
    s.fontWeight = 700
    s.fontSize = '36px'
    s.lineHeight = '60px'
  }
  if (typo === 'title2') {
    s.fontWeight = 700
    s.fontSize = '22px'
    s.lineHeight = '32px'
  }
  if (typo === 'subtitle600') {
    s.fontWeight = 600
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typo === 'subtitle500') {
    s.fontWeight = 500
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typo === 'subtitle400') {
    s.fontWeight = 400
    s.fontSize = '18px'
    s.lineHeight = '28px'
  }
  if (typo === 'subtext600') {
    s.fontWeight = 600
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typo === 'subtext500') {
    s.fontWeight = 500
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typo === 'subtext400') {
    s.fontWeight = 400
    s.fontSize = '16px'
    s.lineHeight = '24px'
  }
  if (typo === 'body600') {
    s.fontWeight = 600
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typo === 'body500') {
    s.fontWeight = 500
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typo === 'body400') {
    s.fontWeight = 400
    s.fontSize = '14px'
    s.lineHeight = '20px'
  }
  if (typo === 'caption600') {
    s.fontWeight = 600
    s.fontSize = '12px'
    s.lineHeight = '16px'
  }
  if (typo === 'caption500') {
    s.fontWeight = 500
    s.fontSize = '12px'
    s.lineHeight = '16px'
  }
  if (typo === 'caption400') {
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

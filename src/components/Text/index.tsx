import React, { FC, CSSProperties } from 'react'
import { Size, Color } from '~/types'
import { font } from '~/utils'

export const Text: FC = ({
  style,
  size = 'md',
  color: colorProp = 'TextPrimary',
  weight,
  ...props
}: {
  size: Size
  color: Color
  weight: number
  style?: CSSProperties
}) => (
  <div
    style={{
      ...font(size, colorProp, weight),
      ...style,
    }}
    {...props}
  />
)

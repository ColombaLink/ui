import React, { CSSProperties } from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

export const DotIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  style,
  ...props
}: {
  color?: Color
  size?: number
  style?: CSSProperties
}) => {
  return (
    <div
      style={{
        backgroundColor: color(colorProp),
        width: size,
        height: size,
        borderRadius: size / 2,
        ...style,
      }}
      {...props}
    />
  )
}

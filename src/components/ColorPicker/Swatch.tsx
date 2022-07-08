import React, { CSSProperties } from 'react'

export const Swatch = ({
  color,
  size = 80,
  style,
}: {
  color: string
  size: number
  style?: CSSProperties
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: 4,
        ...style,
      }}
    />
  )
}

import React, { CSSProperties } from 'react'
import { color } from '~/utils'
import { transparent } from './bg'

export const Swatch = ({
  color: colorProp,
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
        background: transparent,
        border: `1px solid ${color('OtherDivider')}`,
        width: size,
        height: size,
        borderRadius: 4,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: colorProp,
        }}
      />
    </div>
  )
}

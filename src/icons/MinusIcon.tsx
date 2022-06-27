import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const MinusIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <rect
        x="2.5"
        y="8.75"
        width="15"
        height="2.5"
        rx="1.25"
        fill={color(colorProp)}
      />
    </svg>
  )
}

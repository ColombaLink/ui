import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ChevronUpIcon = ({
  color: colorProp = 'currentColor',
  strokeWidth = 1.66667,
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.5 13.75L10 6.25L2.5 13.75"
        stroke={color(colorProp)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

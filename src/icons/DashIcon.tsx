import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const DashIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <rect x="2" y="7" width="12" height="2" rx="1" fill={color(colorProp)} />
    </svg>
  )
}

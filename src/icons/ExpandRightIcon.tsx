import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ExpandRightIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M7.5 4.79304C7.5 3.98924 8.12791 3.48843 8.6279 3.89344L14.6279 9.1004C15.124 9.50228 15.124 10.4977 14.6279 10.8996L8.6279 16.1066C8.12791 16.5116 7.5 16.0108 7.5 15.207V4.79304Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

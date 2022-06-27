import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ChevronRightIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6.25024 17.5L13.7502 10L6.25024 2.5"
        stroke={color(colorProp)}
        strokeWidth="1.66667"
      />
    </svg>
  )
}

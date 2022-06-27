import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const SearchIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M14.1665 14.1665L18.3332 18.3332L14.1665 14.1665ZM16.2498 8.95817C16.2498 12.9853 12.9853 16.2498 8.95817 16.2498C4.9311 16.2498 1.6665 12.9853 1.6665 8.95817C1.6665 4.9311 4.9311 1.6665 8.95817 1.6665C12.9853 1.6665 16.2498 4.9311 16.2498 8.95817Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

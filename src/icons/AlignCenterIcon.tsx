import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const AlignCenterIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path d="M15 8.3335H5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path d="M17.5 5H2.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path d="M15 15H5" stroke={color(colorProp)} strokeWidth="1.5" />
    </svg>
  )
}

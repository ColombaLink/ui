import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ChevronDownIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const ChevronDownIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ChevronDownIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 6.25L10 13.75L17.5 6.25"
        stroke={color(colorProp)}
        strokeWidth="1.66667"
      />
    </svg>
  )
}

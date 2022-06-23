import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ChevronLeftIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const ChevronLeftIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ChevronLeftIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M13.75 2.5L6.25 10L13.75 17.5"
        stroke={color(colorProp)}
        strokeWidth="1.66667"
      />
    </svg>
  )
}

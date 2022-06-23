import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ChevronRightIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const ChevronUpIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ChevronRightIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.5 13.75L10 6.25L2.5 13.75"
        stroke={color(colorProp)}
        strokeWidth="1.66667"
      />
    </svg>
  )
}

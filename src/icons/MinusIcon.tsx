import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type MinusIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const MinusIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: MinusIconProps) => {
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

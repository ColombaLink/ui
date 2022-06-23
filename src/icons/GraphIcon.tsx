import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type GraphIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color
  size?: number
}

export const GraphIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  ...props
}: GraphIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={color(colorProp)}
      {...props}
    >
      <path d="M2.5 2.5V17.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path d="M17.5 17.5H2.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path
        d="M5.8335 13.3333L10.2085 8.95833L13.1252 11.875L17.5002 7.5"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

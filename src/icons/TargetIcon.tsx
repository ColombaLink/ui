import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type TargetIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const TargetIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: TargetIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39746 14.6022 1.6665 9.99984 1.6665C5.39746 1.6665 1.6665 5.39746 1.6665 9.99984C1.6665 14.6022 5.39746 18.3332 9.99984 18.3332Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M10.0002 11.6668C10.9206 11.6668 11.6668 10.9206 11.6668 10.0002C11.6668 9.07969 10.9206 8.3335 10.0002 8.3335C9.07969 8.3335 8.3335 9.07969 8.3335 10.0002C8.3335 10.9206 9.07969 11.6668 10.0002 11.6668Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type LightModeIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const LightModeIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: LightModeIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10.0002 14.1668C12.3013 14.1668 14.1668 12.3013 14.1668 10.0002C14.1668 7.69898 12.3013 5.8335 10.0002 5.8335C7.69898 5.8335 5.8335 7.69898 5.8335 10.0002C5.8335 12.3013 7.69898 14.1668 10.0002 14.1668Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M10 0.833496V2.50016"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path d="M10 17.5V19.1667" stroke={color(colorProp)} strokeWidth="1.5" />
      <path
        d="M3.5166 3.5166L4.69993 4.69993"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M15.3 15.3L16.4834 16.4834"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M0.833496 10H2.50016"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path d="M17.5 10H19.1667" stroke={color(colorProp)} strokeWidth="1.5" />
      <path
        d="M3.5166 16.4834L4.69993 15.3"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M15.3 4.69993L16.4834 3.5166"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

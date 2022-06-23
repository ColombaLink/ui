import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ScheduleIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const ScheduleIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ScheduleIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M7.5 2.5H2.5V5.83333H7.5V2.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9.16667 14.1665H2.5V17.4998H9.16667V14.1665Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M17.5002 8.3335H5.8335V11.6668H17.5002V8.3335Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

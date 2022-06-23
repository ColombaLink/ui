import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type DeleteIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const DeleteIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: DeleteIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6.66667 4.99984V3.33317C6.66667 2.4127 7.41286 1.6665 8.33333 1.6665H11.6667C12.5872 1.6665 13.3333 2.4127 13.3333 3.33317V4.99984M2.5 4.99984H17.5H2.5ZM4.16667 4.99984V16.6665C4.16667 17.587 4.91286 18.3332 5.83333 18.3332H14.1667C15.0872 18.3332 15.8333 17.587 15.8333 16.6665V4.99984H4.16667Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M11.6665 9.1665V14.1665"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M8.3335 9.1665V14.1665"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

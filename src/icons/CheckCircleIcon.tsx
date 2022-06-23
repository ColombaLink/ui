import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type CheckCircleIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const CheckCircleIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: CheckCircleIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM6.42259 10.2197L8.25838 11.8719L13.5114 6.53666C13.7957 6.21096 14.3196 6.15438 14.6815 6.41029C15.0434 6.6662 15.1062 7.13769 14.8219 7.46339L8.98858 13.4634C8.67992 13.8169 8.09734 13.8483 7.74406 13.5303L5.24408 11.2803C4.91864 10.9874 4.91864 10.5126 5.24408 10.2197C5.56951 9.92679 6.09715 9.92679 6.42259 10.2197Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

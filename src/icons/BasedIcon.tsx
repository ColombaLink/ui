import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const BasedIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size * 2}
      height={size * 2}
      viewBox="0 0 56 50"
      fill="none"
      // style={style}
    >
      <path
        d="M38.411 19.1992L28.8696 28.7407H19.3281L28.8696 19.1992H38.411Z"
        fill={color(colorProp)}
      />
      <path
        d="M40.6562 28.7405L31.1148 38.2819H19.3281L28.8696 28.7405H40.6562Z"
        fill={color(colorProp)}
      />
      <path
        d="M28.8696 10.2188L19.3281 19.7602V28.7405L28.8696 19.199V10.2188Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

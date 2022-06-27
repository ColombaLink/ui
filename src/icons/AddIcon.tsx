import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const AddIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M10.5 2.625C9.77513 2.625 9.1875 3.21263 9.1875 3.9375V9.1875H3.9375C3.21263 9.1875 2.625 9.77513 2.625 10.5C2.625 11.2249 3.21263 11.8125 3.9375 11.8125H9.1875V17.0625C9.1875 17.7874 9.77513 18.375 10.5 18.375C11.2249 18.375 11.8125 17.7874 11.8125 17.0625V11.8125H17.0625C17.7874 11.8125 18.375 11.2249 18.375 10.5C18.375 9.77513 17.7874 9.1875 17.0625 9.1875H11.8125V3.9375C11.8125 3.21263 11.2249 2.625 10.5 2.625Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const EmailIconFilled = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 14"
      fill={color(colorProp)}
      {...props}
    >
      <path
        d="M0.25 4.22425V11.375C0.25 12.7557 1.36929 13.875 2.75 13.875H15.25C16.6307 13.875 17.75 12.7557 17.75 11.375V4.22425L10.3102 8.80256C9.50673 9.29703 8.49327 9.29703 7.68976 8.80256L0.25 4.22425Z"
        fill={color(colorProp)}
      />
      <path
        d="M17.75 2.75652V2.625C17.75 1.24429 16.6307 0.125 15.25 0.125H2.75C1.36929 0.125 0.25 1.24429 0.25 2.625V2.75652L8.34488 7.73799C8.74664 7.98522 9.25336 7.98522 9.65512 7.73799L17.75 2.75652Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

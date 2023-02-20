import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const VideoIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19.82 3C20.4717 3 21 3.5283 21 4.18V6H18V3L19.82 3ZM16 3V6H13V3L16 3ZM11 3V6L8 6L8 3L11 3ZM6 3L6 6H3L3 4.18C3 3.5283 3.5283 3 4.18 3L6 3ZM12 1H7H4.18C2.42373 1 1 2.42373 1 4.18V7V19.82C1 21.5763 2.42373 23 4.18 23H19.82C21.5763 23 23 21.5763 23 19.82V7V4.18C23 2.42373 21.5763 1 19.82 1H17H12ZM3 19.82L3 8L21 8V19.82C21 20.4717 20.4717 21 19.82 21H4.18C3.5283 21 3 20.4717 3 19.82ZM10.5145 10.1425C10.2056 9.95715 9.82081 9.95229 9.5073 10.1298C9.19379 10.3073 9 10.6397 9 11V17C9 17.3603 9.19379 17.6927 9.5073 17.8702C9.82081 18.0477 10.2056 18.0429 10.5145 17.8575L15.5145 14.8575C15.8157 14.6768 16 14.3513 16 14C16 13.6487 15.8157 13.3232 15.5145 13.1425L10.5145 10.1425ZM13.0563 14L11 15.2338V12.7662L13.0563 14Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
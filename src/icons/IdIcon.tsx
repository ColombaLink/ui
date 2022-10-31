import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const IdIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5.9146 4V20H3V4H5.9146Z" fill={color(colorProp)} />
      <path
        d="M14.1911 20H8.73894V4H14.301C15.8984 4 17.2706 4.32031 18.4176 4.96094C19.5699 5.59635 20.455 6.51042 21.073 7.70313C21.691 8.89583 22 10.3229 22 11.9844C22 13.651 21.6884 15.0833 21.0651 16.2812C20.4471 17.4792 19.5541 18.3984 18.3862 19.0391C17.2235 19.6797 15.8251 20 14.1911 20ZM11.6535 17.4922H14.0497C15.1705 17.4922 16.1053 17.2891 16.8543 16.8828C17.6032 16.4714 18.1662 15.8594 18.5433 15.0469C18.9204 14.2292 19.109 13.2083 19.109 11.9844C19.109 10.7604 18.9204 9.74479 18.5433 8.9375C18.1662 8.125 17.6085 7.51823 16.87 7.11719C16.1367 6.71094 15.2254 6.50781 14.1361 6.50781H11.6535V17.4922Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
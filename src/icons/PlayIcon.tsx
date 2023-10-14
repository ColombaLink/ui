import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const PlayIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 18" fill="none" {...props}>
      <path
        d="M1.66211 17.2305C0.939453 17.2305 0.490234 16.6738 0.490234 15.8242V2.09375C0.490234 1.24414 0.939453 0.697266 1.66211 0.697266C2.05273 0.697266 2.38477 0.84375 2.77539 1.06836L14.1621 7.66016C14.9727 8.12891 15.2559 8.44141 15.2559 8.95898C15.2559 9.47656 14.9727 9.78906 14.1621 10.2676L2.77539 16.8496C2.38477 17.0742 2.05273 17.2305 1.66211 17.2305Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const TextIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M11.6957 18.3785C11.6957 19.1202 11.2225 19.5806 10.4936 19.5806C9.75192 19.5806 9.30435 19.1202 9.30435 18.3785V3.14834H4.11253C3.46036 3.14834 3 2.72634 3 2.07417C3 1.42199 3.46036 1 4.11253 1H16.8875C17.5396 1 18 1.42199 18 2.07417C18 2.72634 17.5396 3.14834 16.8875 3.14834H11.6957V18.3785Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

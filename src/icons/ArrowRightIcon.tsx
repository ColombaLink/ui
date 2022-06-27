import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ArrowRightIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M10.5893 4.07733C10.2638 3.75189 9.7362 3.75189 9.41076 4.07733C9.08533 4.40277 9.08533 4.9304 9.41076 5.25584L13.8216 9.66669H4.16659C3.70635 9.66669 3.33325 10.0398 3.33325 10.5C3.33325 10.9603 3.70635 11.3334 4.16659 11.3334H13.8214L9.41076 15.744C9.08533 16.0694 9.08533 16.5971 9.41076 16.9225C9.7362 17.2479 10.2638 17.2479 10.5893 16.9225L16.4226 11.0892C16.748 10.7637 16.748 10.2361 16.4226 9.91066L10.5893 4.07733Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

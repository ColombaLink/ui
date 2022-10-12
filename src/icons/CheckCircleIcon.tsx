import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const CheckCircleIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.875 9C0.875 4.51269 4.51269 0.875 9 0.875C13.4873 0.875 17.125 4.51269 17.125 9C17.125 13.4873 13.4873 17.125 9 17.125C4.51269 17.125 0.875 13.4873 0.875 9ZM12.0086 7.48827C12.2092 7.20739 12.1442 6.81705 11.8633 6.61642C11.5824 6.41579 11.192 6.48084 10.9914 6.76173L8.29525 10.5364L6.94194 9.18306C6.69786 8.93898 6.30214 8.93898 6.05806 9.18306C5.81398 9.42714 5.81398 9.82286 6.05806 10.0669L7.93306 11.9419C8.06297 12.0719 8.24346 12.138 8.42655 12.1229C8.60964 12.1077 8.7768 12.0128 8.88358 11.8633L12.0086 7.48827Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const PauseIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 13 16" fill="none" {...props}>
      <path
        d="M1.78906 15.9082C0.939453 15.9082 0.490234 15.459 0.490234 14.5996V1.29883C0.490234 0.449219 0.939453 0 1.78906 0H4.01562C4.86523 0 5.31445 0.410156 5.31445 1.29883V14.5996C5.31445 15.459 4.86523 15.9082 4.01562 15.9082H1.78906ZM8.88867 15.9082C8.0293 15.9082 7.58008 15.459 7.58008 14.5996V1.29883C7.58008 0.449219 8.0293 0 8.88867 0H11.1055C11.9648 0 12.4043 0.410156 12.4043 1.29883V14.5996C12.4043 15.459 11.9648 15.9082 11.1055 15.9082H8.88867Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

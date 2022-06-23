import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'
import { styled } from 'inlines'

export const LoadingIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  style,
  ...props
}: Icon) => {
  return (
    <styled.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{
        '@keyframes': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDuration: '2s',
        ...style,
      }}
      {...props}
    >
      <path
        d="M9.99984 14.9998V18.3332M13.3332 13.3332L15.8332 15.8332L13.3332 13.3332ZM14.9998 9.99984H18.3332H14.9998ZM6.6665 6.6665L4.1665 4.1665L6.6665 6.6665ZM13.3332 6.6665L15.8332 4.1665L13.3332 6.6665ZM6.6665 13.3332L4.1665 15.8332L6.6665 13.3332ZM1.6665 9.99984H4.99984H1.6665ZM9.99984 1.6665V4.99984V1.6665Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </styled.svg>
  )
}

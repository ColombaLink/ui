import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const UploadIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M10.5406 1.98016C10.4042 1.83829 10.2124 1.75 10 1.75C9.98626 1.75 9.97261 1.75037 9.95906 1.7511C9.90163 1.75419 9.84592 1.76374 9.79265 1.77903C9.67431 1.81292 9.56267 1.87646 9.46947 1.96967L5.3028 6.13634C5.00991 6.42923 5.00991 6.9041 5.3028 7.197C5.59569 7.48989 6.07057 7.48989 6.36346 7.197L9.25 4.31046V12.5C9.25 12.9142 9.58579 13.25 10 13.25C10.4142 13.25 10.75 12.9142 10.75 12.5V4.31086L13.6361 7.197C13.929 7.48989 14.4039 7.48989 14.6968 7.197C14.9897 6.9041 14.9897 6.42923 14.6968 6.13634L10.5406 1.98016ZM2.5 11.75C2.91421 11.75 3.25 12.0858 3.25 12.5V15.8333C3.25 16.0764 3.34658 16.3096 3.51849 16.4815C3.69039 16.6534 3.92355 16.75 4.16667 16.75H15.8333C16.0764 16.75 16.3096 16.6534 16.4815 16.4815C16.6534 16.3096 16.75 16.0764 16.75 15.8333V12.5C16.75 12.0858 17.0858 11.75 17.5 11.75C17.9142 11.75 18.25 12.0858 18.25 12.5V15.8333C18.25 16.4743 17.9954 17.089 17.5422 17.5422C17.089 17.9954 16.4743 18.25 15.8333 18.25H4.16667C3.52573 18.25 2.91104 17.9954 2.45783 17.5422C2.00461 17.089 1.75 16.4743 1.75 15.8333V12.5C1.75 12.0858 2.08579 11.75 2.5 11.75Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

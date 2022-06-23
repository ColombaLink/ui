import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type AttachmentIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const AttachmentIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: AttachmentIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.8671 9.20859L10.2087 16.8669C9.27053 17.8051 7.99806 18.3322 6.67124 18.3322C5.34442 18.3322 4.07194 17.8051 3.13374 16.8669C2.19553 15.9287 1.66846 14.6562 1.66846 13.3294C1.66846 12.0026 2.19553 10.7301 3.13374 9.79193L10.7921 2.13359C11.4175 1.50812 12.2659 1.15674 13.1504 1.15674C14.035 1.15674 14.8833 1.50812 15.5087 2.13359C16.1342 2.75906 16.4856 3.60738 16.4856 4.49193C16.4856 5.37647 16.1342 6.22479 15.5087 6.85026L7.84207 14.5086C7.52934 14.8213 7.10518 14.997 6.6629 14.997C6.22063 14.997 5.79647 14.8213 5.48374 14.5086C5.171 14.1959 4.99531 13.7717 4.99531 13.3294C4.99531 12.8872 5.171 12.463 5.48374 12.1503L12.5587 5.08359"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

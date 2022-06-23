import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ReferenceIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const ReferenceIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ReferenceIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M11.2713 7.99997C11.4199 8.4734 11.5001 8.97717 11.5001 9.49966C11.5001 12.261 9.26153 14.4996 6.50015 14.4996C3.73877 14.4996 1.50022 12.261 1.50022 9.49966C1.50022 6.73828 3.73877 4.49973 6.50015 4.49973C6.50016 4.49973 6.50017 4.49973 6.50018 4.49973V2.99976C6.50017 2.99976 6.50016 2.99976 6.50015 2.99976C2.91035 2.99976 0.000244141 5.90986 0.000244141 9.49966C0.000244141 13.0895 2.91035 15.9996 6.50015 15.9996C10.0899 15.9996 13.0001 13.0895 13.0001 9.49966C13.0001 8.9835 12.9399 8.48139 12.8262 7.99997H11.2713Z"
        fill={color(colorProp)}
      />
      <path
        d="M8.72898 10.9998C8.58031 10.5264 8.50016 10.0226 8.50016 9.50009C8.50016 6.73871 10.7387 4.50016 13.5001 4.50016C16.2615 4.50016 18.5 6.73871 18.5 9.50009C18.5 12.2615 16.2615 14.5 13.5001 14.5C13.5001 14.5 13.5001 14.5 13.5001 14.5V16C13.5001 16 13.5001 16 13.5001 16C17.0899 16 20 13.0899 20 9.50009C20 5.91029 17.0899 3.00019 13.5001 3.00019C9.91029 3.00019 7.00019 5.91029 7.00019 9.50009C7.00019 10.0163 7.06035 10.5184 7.17405 10.9998H8.72898Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

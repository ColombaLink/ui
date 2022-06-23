import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type GoogleIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const GoogleIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: GoogleIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M20 10.2339C20 15.9395 16.0287 20 10.1639 20C4.54098 20 0 15.5323 0 10C0 4.46774 4.54098 0 10.1639 0C12.9016 0 15.2049 0.987903 16.9795 2.61694L14.2131 5.23387C10.5943 1.79839 3.86475 4.37903 3.86475 10C3.86475 13.4879 6.69672 16.3145 10.1639 16.3145C14.1885 16.3145 15.6967 13.4758 15.9344 12.004H10.1639V8.56452H19.8402C19.9344 9.07661 20 9.56855 20 10.2339Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

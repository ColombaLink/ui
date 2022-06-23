import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type FileIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const FileIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: FileIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10.8335 1.6665H5.00016C4.55814 1.6665 4.13421 1.8421 3.82165 2.15466C3.50909 2.46722 3.3335 2.89114 3.3335 3.33317V16.6665C3.3335 17.1085 3.50909 17.5325 3.82165 17.845C4.13421 18.1576 4.55814 18.3332 5.00016 18.3332H15.0002C15.4422 18.3332 15.8661 18.1576 16.1787 17.845C16.4912 17.5325 16.6668 17.1085 16.6668 16.6665V7.49984M10.8335 1.6665L16.6668 7.49984M10.8335 1.6665V7.49984H16.6668"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

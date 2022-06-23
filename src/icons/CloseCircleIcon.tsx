import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type CloseCircleIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const CloseCircleIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: CloseCircleIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM13.4004 6.59972C13.7251 6.92434 13.7251 7.45066 13.4004 7.77528L11.1756 10.0001L13.4004 12.2249C13.7251 12.5495 13.7251 13.0758 13.4004 13.4004C13.0758 13.7251 12.5495 13.7251 12.2249 13.4004L10.0001 11.1756L7.77528 13.4004C7.45066 13.7251 6.92434 13.7251 6.59972 13.4004C6.27509 13.0758 6.27509 12.5495 6.59972 12.2249L8.82451 10.0001L6.59972 7.77528C6.27509 7.45066 6.27509 6.92434 6.59972 6.59972C6.92434 6.27509 7.45066 6.27509 7.77528 6.59972L10.0001 8.82451L12.2249 6.59972C12.5495 6.27509 13.0758 6.27509 13.4004 6.59972Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

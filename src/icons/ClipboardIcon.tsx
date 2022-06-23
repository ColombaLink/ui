import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type ClipboardIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const ClipboardIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: ClipboardIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.41693 2.50008C7.41693 2.45406 7.45424 2.41675 7.50026 2.41675H12.5003C12.5463 2.41675 12.5836 2.45406 12.5836 2.50008V3.32081C12.5835 3.32497 12.5835 3.32914 12.5835 3.33331C12.5835 3.33749 12.5835 3.34165 12.5836 3.34581V4.16675C12.5836 4.21277 12.5463 4.25008 12.5003 4.25008H7.50026C7.45424 4.25008 7.41693 4.21277 7.41693 4.16675V2.50008ZM14.0836 4.08331V4.16675C14.0836 5.0412 13.3747 5.75008 12.5003 5.75008H7.50026C6.62581 5.75008 5.91693 5.0412 5.91693 4.16675V4.08331H5.00016C4.75705 4.08331 4.52389 4.17989 4.35198 4.3518C4.18007 4.52371 4.0835 4.75686 4.0835 4.99998V16.6666C4.0835 16.9098 4.18007 17.1429 4.35198 17.3148C4.52389 17.4867 4.75705 17.5833 5.00016 17.5833H15.0002C15.2433 17.5833 15.4764 17.4867 15.6483 17.3148C15.8203 17.1429 15.9168 16.9098 15.9168 16.6666V4.99998C15.9168 4.75687 15.8203 4.52371 15.6483 4.3518C15.4764 4.17989 15.2433 4.08331 15.0002 4.08331H14.0836ZM5.91693 2.58331V2.50008C5.91693 1.62563 6.62581 0.916748 7.50026 0.916748H12.5003C13.3747 0.916748 14.0836 1.62563 14.0836 2.50008V2.58331H15.0002C15.6411 2.58331 16.2558 2.83793 16.709 3.29114C17.1622 3.74435 17.4168 4.35904 17.4168 4.99998V16.6666C17.4168 17.3076 17.1622 17.9223 16.709 18.3755C16.2558 18.8287 15.6411 19.0833 15.0002 19.0833H5.00016C4.35922 19.0833 3.74453 18.8287 3.29132 18.3755C2.83811 17.9223 2.5835 17.3076 2.5835 16.6666V4.99998C2.5835 4.35904 2.83811 3.74435 3.29132 3.29114C3.74453 2.83793 4.35922 2.58331 5.00016 2.58331H5.91693Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

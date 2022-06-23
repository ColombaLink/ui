import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const WarningIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M10.9859 10.9859V4.97653H9.01408V10.9859H10.9859ZM10.9859 15.0235V13.0047H9.01408V15.0235H10.9859ZM2.9108 2.95775C4.88263 0.985915 7.2457 0 10 0C12.7543 0 15.1017 0.985915 17.0423 2.95775C19.0141 4.89828 20 7.2457 20 10C20 12.7543 19.0141 15.1174 17.0423 17.0892C15.1017 19.0297 12.7543 20 10 20C7.2457 20 4.88263 19.0297 2.9108 17.0892C0.970266 15.1174 0 12.7543 0 10C0 7.2457 0.970266 4.89828 2.9108 2.95775Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

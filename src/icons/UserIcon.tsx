import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const UserIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25003 4C3.25003 1.92893 4.92896 0.25 7.00003 0.25C9.0711 0.25 10.75 1.92893 10.75 4C10.75 6.07107 9.0711 7.75 7.00003 7.75C4.92896 7.75 3.25003 6.07107 3.25003 4Z"
        fill={color(colorProp)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.12607 15.7544C0.19052 12.013 3.24335 9 7.00003 9C10.7568 9 13.8097 12.0131 13.874 15.7547C13.8783 16.0028 13.7353 16.23 13.5097 16.3335C11.5273 17.2432 9.32213 17.75 7.0003 17.75C4.67825 17.75 2.47289 17.2431 0.4903 16.3332C0.264741 16.2297 0.121795 16.0026 0.12607 15.7544Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

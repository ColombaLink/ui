import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const BasedIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={(size / 4) * 5} viewBox="0 0 20 20" fill="none">
      <path
        d="M12.2399 5.75977L6.11996 11.8797H0L6.11996 5.75977H12.2399Z"
        fill={color(colorProp)}
      />
      <path
        d="M13.68 11.8804L7.56009 18.0003H0L6.11996 11.8804H13.68Z"
        fill={color(colorProp)}
      />
      <path
        d="M6.11996 0L0 6.11996V11.88L6.11996 5.76004V0Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

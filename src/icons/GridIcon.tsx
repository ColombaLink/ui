import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type GridIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const GridIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: GridIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M1.5 0.75C1.08579 0.75 0.75 1.08579 0.75 1.5V7.33333C0.75 7.74755 1.08579 8.08333 1.5 8.08333H7.33333C7.74755 8.08333 8.08333 7.74755 8.08333 7.33333V1.5C8.08333 1.08579 7.74755 0.75 7.33333 0.75H1.5ZM2.25 6.58333V2.25H6.58333V6.58333H2.25ZM10.6666 0.75C10.2524 0.75 9.91656 1.08579 9.91656 1.5V7.33333C9.91656 7.74755 10.2524 8.08333 10.6666 8.08333H16.4999C16.9141 8.08333 17.2499 7.74755 17.2499 7.33333V1.5C17.2499 1.08579 16.9141 0.75 16.4999 0.75H10.6666ZM11.4166 6.58333V2.25H15.7499V6.58333H11.4166ZM9.91656 10.6666C9.91656 10.2524 10.2524 9.91656 10.6666 9.91656H16.4999C16.9141 9.91656 17.2499 10.2524 17.2499 10.6666V16.4999C17.2499 16.9141 16.9141 17.2499 16.4999 17.2499H10.6666C10.2524 17.2499 9.91656 16.9141 9.91656 16.4999V10.6666ZM11.4166 11.4166V15.7499H15.7499V11.4166H11.4166ZM1.5 9.91656C1.08579 9.91656 0.75 10.2524 0.75 10.6666V16.4999C0.75 16.9141 1.08579 17.2499 1.5 17.2499H7.33333C7.74755 17.2499 8.08333 16.9141 8.08333 16.4999V10.6666C8.08333 10.2524 7.74755 9.91656 7.33333 9.91656H1.5ZM2.25 15.7499V11.4166H6.58333V15.7499H2.25Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

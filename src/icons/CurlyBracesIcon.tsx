import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type CurlyBracesIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const CurlyBracesIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: CurlyBracesIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M7.47701 18.381H8.01017V17.0142H7.62242C6.25559 17.0142 5.70304 16.3841 5.70304 14.8331V12.0703C5.70304 10.6744 5.00508 9.9474 3.58009 9.80199V9.56934C5.00508 9.42393 5.70304 8.69689 5.70304 7.30098V4.54794C5.70304 2.99693 6.25559 2.36683 7.62242 2.36683H8.01017V1H7.47701C5.15049 1 4.11325 2.07601 4.11325 4.33467V6.69997C4.11325 8.25098 3.58009 8.76475 2 8.76475V10.6066C3.58009 10.6066 4.11325 11.1203 4.11325 12.6714V15.0463C4.11325 17.305 5.18927 18.381 7.47701 18.381Z"
        fill={color(colorProp)}
      />
      <path
        d="M13.0025 18.381C15.2902 18.381 16.3662 17.305 16.3662 15.0463V12.6714C16.3662 11.1203 16.8994 10.6066 18.4795 10.6066V8.76475C16.8994 8.76475 16.3662 8.25098 16.3662 6.69997V4.33467C16.3662 2.07601 15.329 1 13.0025 1H12.4693V2.36683H12.8571C14.2239 2.36683 14.7765 2.99693 14.7765 4.54794V7.30098C14.7765 8.69689 15.4744 9.42393 16.8994 9.56934V9.80199C15.4744 9.9474 14.7765 10.6744 14.7765 12.0703V14.8331C14.7765 16.3841 14.2239 17.0142 12.8571 17.0142H12.4693V18.381H13.0025Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

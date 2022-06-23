import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type CloseIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const CloseIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: CloseIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M4.33662 4.33769C4.012 4.66232 4.012 5.18864 4.33662 5.51326L8.46503 9.64166L4.38676 13.7199C4.03529 14.0714 4.03529 14.6412 4.38676 14.9927C4.73823 15.3442 5.30808 15.3442 5.65955 14.9927L9.73782 10.9145L13.7677 14.9443C14.0923 15.2689 14.6186 15.2689 14.9432 14.9443C15.2678 14.6197 15.2678 14.0934 14.9432 13.7687L10.9134 9.73889L14.9934 5.65891C15.3448 5.30744 15.3448 4.73759 14.9934 4.38612C14.6419 4.03465 14.072 4.03465 13.7206 4.38612L9.64059 8.4661L5.51219 4.33769C5.18757 4.01307 4.66125 4.01307 4.33662 4.33769Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

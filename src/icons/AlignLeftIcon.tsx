import React from 'react'

type AlignLeftIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const AlignLeftIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: AlignLeftIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M14.1667 8.3335H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 5H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M14.1667 15H2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

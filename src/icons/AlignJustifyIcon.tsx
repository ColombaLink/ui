import React from 'react'

type AlignJustifyIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const AlignJustifyIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: AlignJustifyIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path d="M17.5 8.3335H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 5H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 15H2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

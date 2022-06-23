import React from 'react'

type AlignCenterIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const AlignCenterIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: AlignCenterIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path d="M15 8.3335H5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 5H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M15 15H5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

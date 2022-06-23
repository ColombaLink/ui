import React from 'react'

type DuplicateIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const DuplicateIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: DuplicateIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M3.84688 14.8825H5.26111V16.1605C5.26111 17.8813 6.12122 18.75 7.85799 18.75H16.1614C17.8816 18.75 18.75 17.8813 18.75 16.1605V7.70704C18.75 5.98628 17.8816 5.11754 16.1614 5.11754H14.7389V3.8395C14.7389 2.11874 13.8705 1.25 12.1503 1.25H3.84688C2.11011 1.25 1.25 2.11874 1.25 3.8395V12.293C1.25 14.0137 2.11011 14.8825 3.84688 14.8825ZM3.86342 13.5376C3.03639 13.5376 2.58152 13.0865 2.58152 12.2178V3.91468C2.58152 3.04594 3.03639 2.59487 3.86342 2.59487H12.1255C12.9442 2.59487 13.4074 3.04594 13.4074 3.91468V5.11754H7.85799C6.12122 5.11754 5.26111 5.97792 5.26111 7.70704V13.5376H3.86342ZM7.87453 17.4051C7.05577 17.4051 6.59263 16.9541 6.59263 16.0853V7.78222C6.59263 6.91348 7.05577 6.46241 7.87453 6.46241H16.1366C16.9553 6.46241 17.4185 6.91348 17.4185 7.78222V16.0853C17.4185 16.9541 16.9553 17.4051 16.1366 17.4051H7.87453ZM12.0014 15.676C12.4397 15.676 12.7044 15.3753 12.7044 14.8908V12.6354H15.078C15.5411 12.6354 15.8637 12.3848 15.8637 11.9421C15.8637 11.4911 15.5659 11.2321 15.078 11.2321H12.7044V8.82637C12.7044 8.33353 12.4397 8.03282 12.0014 8.03282C11.5631 8.03282 11.315 8.35024 11.315 8.82637V11.2321H8.9414C8.46172 11.2321 8.15572 11.4911 8.15572 11.9421C8.15572 12.3848 8.47826 12.6354 8.9414 12.6354H11.315V14.8908C11.315 15.3586 11.5631 15.676 12.0014 15.676Z"
        fill={color}
      />
    </svg>
  )
}

import React from 'react'

type UploadIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const UploadCloudIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: UploadIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M5.28434 5.13231C5.97073 3.11315 7.8228 1.6665 9.99984 1.6665C12.7613 1.6665 14.9998 3.99405 14.9998 6.86522C16.8408 6.86522 18.3332 8.41692 18.3332 10.331C18.3332 11.6138 17.6628 12.7339 16.6665 13.3332M5.26708 5.17187C3.23367 5.45905 1.6665 7.27148 1.6665 9.4645C1.6665 10.8817 2.321 12.14 3.33288 12.9304"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9.99984 10V18.3333M6.6665 13.3333L9.99984 10L6.6665 13.3333ZM9.99984 10L13.3332 13.3333L9.99984 10Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

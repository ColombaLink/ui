import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type DarkModeIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const DarkModeIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: DarkModeIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.4999 10.6583C17.3688 12.0768 16.8365 13.4287 15.9651 14.5557C15.0938 15.6826 13.9195 16.5382 12.5797 17.0221C11.2398 17.5061 9.7899 17.5984 8.3995 17.2884C7.0091 16.9784 5.73575 16.2788 4.72844 15.2715C3.72113 14.2642 3.02153 12.9908 2.71151 11.6004C2.40148 10.21 2.49385 8.76007 2.9778 7.42025C3.46175 6.08042 4.31728 4.90614 5.44426 4.03479C6.57125 3.16345 7.92308 2.63109 9.34159 2.5C8.5111 3.62356 8.11146 5.00787 8.21536 6.40118C8.31926 7.79448 8.9198 9.10422 9.90775 10.0922C10.8957 11.0801 12.2054 11.6807 13.5987 11.7846C14.992 11.8885 16.3764 11.4888 17.4999 10.6583Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}

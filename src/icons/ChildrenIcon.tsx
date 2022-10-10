import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ChildrenIcon = ({
  color: colorProp = 'currentColor',
  strokeWidth = 1.45,
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="transparent"
      {...props}
    >
      <path
        d="M6.29688 8.66795C6.58318 9.0507 6.94845 9.3674 7.36791 9.59657C7.78737 9.82574 8.25121 9.96202 8.72798 9.99617C9.20474 10.0303 9.68327 9.96152 10.1311 9.79447C10.5789 9.62741 10.9856 9.36599 11.3235 9.02795L13.3235 7.02795C13.9307 6.39927 14.2667 5.55726 14.2591 4.68327C14.2515 3.80929 13.901 2.97324 13.2829 2.35522C12.6649 1.73719 11.8289 1.38663 10.9549 1.37903C10.0809 1.37144 9.23888 1.70742 8.61021 2.31461L7.46354 3.45461"
        stroke={color(colorProp)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.96237 7.33283C8.67607 6.95008 8.3108 6.63338 7.89134 6.40421C7.47188 6.17503 7.00803 6.03875 6.53127 6.00461C6.05451 5.97047 5.57598 6.03925 5.12814 6.20631C4.6803 6.37337 4.27363 6.63479 3.93571 6.97283L1.93571 8.97283C1.32851 9.60151 0.992531 10.4435 1.00013 11.3175C1.00772 12.1915 1.35828 13.0275 1.97631 13.6456C2.59434 14.2636 3.43038 14.6142 4.30437 14.6217C5.17836 14.6293 6.02037 14.2934 6.64904 13.6862L7.78904 12.5462"
        stroke={color(colorProp)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

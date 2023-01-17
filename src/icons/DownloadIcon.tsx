import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const DownloadIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.7314 1.99935C5.4177 1.99935 2.7314 4.68564 2.7314 7.99935C2.7314 11.3131 5.4177 13.9993 8.7314 13.9993C12.0451 13.9993 14.7314 11.3131 14.7314 7.99935C14.7314 4.68564 12.0451 1.99935 8.7314 1.99935ZM1.39807 7.99935C1.39807 3.94926 4.68132 0.666016 8.7314 0.666016C12.7815 0.666016 16.0647 3.94926 16.0647 7.99935C16.0647 12.0494 12.7815 15.3327 8.7314 15.3327C4.68132 15.3327 1.39807 12.0494 1.39807 7.99935ZM5.59333 7.52794C5.85368 7.26759 6.27579 7.26759 6.53614 7.52794L8.06474 9.05654V5.33268C8.06474 4.96449 8.36321 4.66602 8.7314 4.66602C9.09959 4.66602 9.39807 4.96449 9.39807 5.33268V9.05654L10.9267 7.52794C11.187 7.26759 11.6091 7.26759 11.8695 7.52794C12.1298 7.78829 12.1298 8.2104 11.8695 8.47075L9.20281 11.1374C9.07263 11.2676 8.90202 11.3327 8.7314 11.3327C8.64101 11.3327 8.55482 11.3147 8.47622 11.2821C8.39759 11.2496 8.32392 11.2013 8.26 11.1374L5.59333 8.47075C5.33298 8.2104 5.33298 7.78829 5.59333 7.52794Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
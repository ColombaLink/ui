import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ScreensIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M2.4856 13.551C2.73401 14.9676 3.61353 15.5786 5.05029 15.3234L5.14429 15.3033V15.5853C5.14429 17.022 5.90296 17.774 7.35315 17.774H17.1957C18.6459 17.774 19.4045 17.022 19.4045 15.5853V8.73042C19.4045 7.29365 18.6459 6.54169 17.1957 6.54169H15.7388L15.3427 4.33283C15.0942 2.92292 14.2214 2.30524 12.7914 2.55366L3.10327 4.26569C1.66651 4.52082 1.05554 5.38691 1.30396 6.81025L2.4856 13.551ZM3.78809 13.2019L2.64002 6.6894C2.52588 6.05158 2.80786 5.67561 3.41883 5.56818L12.9324 3.88972C13.5366 3.7823 13.9327 4.04414 14.0469 4.68195L14.3759 6.54169H7.35315C5.90296 6.54169 5.14429 7.29365 5.14429 8.73042V13.9471L4.90259 13.9874C4.29163 14.1015 3.90222 13.833 3.78809 13.2019ZM7.44043 16.4312C6.82276 16.4312 6.48706 16.109 6.48706 15.4644V8.85126C6.48706 8.20673 6.82276 7.88447 7.44043 7.88447H17.1084C17.7261 7.88447 18.0685 8.20673 18.0685 8.85126V15.4644C18.0685 16.109 17.7261 16.4312 17.1084 16.4312H7.44043Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

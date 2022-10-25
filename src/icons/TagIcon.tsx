import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const TagIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 0.25C1.59315 0.25 0.25 1.59315 0.25 3.25V7.56802C0.25 8.36367 0.56607 9.12673 1.12868 9.68934L10.7098 19.2705C11.6291 20.1898 13.0989 20.4564 14.2573 19.698C16.4242 18.2793 18.2793 16.4242 19.698 14.2573C20.4564 13.0989 20.1898 11.6291 19.2705 10.7098L9.68934 1.12868C9.12673 0.56607 8.36367 0.25 7.56802 0.25H3.25ZM4.375 5.5C4.99632 5.5 5.5 4.99632 5.5 4.375C5.5 3.75368 4.99632 3.25 4.375 3.25C3.75368 3.25 3.25 3.75368 3.25 4.375C3.25 4.99632 3.75368 5.5 4.375 5.5Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

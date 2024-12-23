
import { Icon } from '~/types'
import { color } from '~/utils'

export const TimeIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.875C4.51269 0.875 0.875 4.51269 0.875 9C0.875 13.4873 4.51269 17.125 9 17.125C13.4873 17.125 17.125 13.4873 17.125 9C17.125 4.51269 13.4873 0.875 9 0.875ZM9.625 4C9.625 3.65482 9.34518 3.375 9 3.375C8.65482 3.375 8.375 3.65482 8.375 4V9C8.375 9.34518 8.65482 9.625 9 9.625H12.75C13.0952 9.625 13.375 9.34518 13.375 9C13.375 8.65482 13.0952 8.375 12.75 8.375H9.625V4Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

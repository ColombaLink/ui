
import { Icon } from '~/types'
import { color } from '~/utils'

export const ExternalLinkAltIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.43154 4.033C5.06335 4.033 4.76487 4.33148 4.76487 4.69967C4.76487 5.06786 5.06335 5.36634 5.43154 5.36634L10.4218 5.36634L4.96014 10.828C4.69979 11.0884 4.69979 11.5105 4.96014 11.7709C5.22049 12.0312 5.6426 12.0312 5.90295 11.7709L11.3645 6.30926V11.2993C11.3645 11.6675 11.663 11.966 12.0312 11.966C12.3994 11.966 12.6979 11.6675 12.6979 11.2993V4.69967C12.6979 4.33148 12.3994 4.033 12.0312 4.033L5.43154 4.033Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

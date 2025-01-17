
import { Icon } from '~/types'
import { color } from '~/utils'

export const StackIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M9.99984 1.6665L1.6665 5.83317L9.99984 9.99984L18.3332 5.83317L9.99984 1.6665Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M1.6665 14.1665L9.99984 18.3332L18.3332 14.1665"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M1.6665 10L9.99984 14.1667L18.3332 10"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

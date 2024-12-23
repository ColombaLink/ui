
import { Icon } from '~/types'
import { color } from '~/utils'

export const AlignRightIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M17.5002 8.3335H5.8335"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path d="M17.5 5H2.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color(colorProp)} strokeWidth="1.5" />
      <path
        d="M17.5002 15H5.8335"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

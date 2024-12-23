
import { Icon } from '~/types'
import { color } from '~/utils'

export const SortIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <rect
        x="2.5"
        y="3.75"
        width="10"
        height="1.625"
        rx="0.8125"
        fill={color(colorProp)}
      />
      <rect
        x="2.5"
        y="8.75"
        width="6.25"
        height="1.625"
        rx="0.8125"
        fill={color(colorProp)}
      />
      <rect
        x="2.5"
        y="13.75"
        width="6.25"
        height="1.625"
        rx="0.8125"
        fill={color(colorProp)}
      />
      <path
        d="M14.8958 15L18.5417 11.3542M14.8958 5.625V15V5.625ZM14.8958 15L11.25 11.3542L14.8958 15Z"
        stroke={color(colorProp)}
        strokeWidth="1.625"
      />
      <path
        d="M14.8958 15L18.5417 11.3542M14.8958 5.625V15V5.625ZM14.8958 15L11.25 11.3542L14.8958 15Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}


import { Icon } from '~/types'
import { color } from '~/utils'

export const MoreIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  style,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      {...props}
      style={{
        boxSizing: 'border-box',
        borderRadius: '2px',
        ...style,
      }}
    >
      <path
        d="M10 7.5C11.0355 7.5 11.875 8.33947 11.875 9.375C11.875 10.4105 11.0355 11.25 10 11.25C8.96447 11.25 8.125 10.4105 8.125 9.375C8.125 8.33947 8.96447 7.5 10 7.5ZM4.375 7.5C5.41053 7.5 6.25 8.33947 6.25 9.375C6.25 10.4105 5.41053 11.25 4.375 11.25C3.33947 11.25 2.5 10.4105 2.5 9.375C2.5 8.33947 3.33947 7.5 4.375 7.5ZM15.625 7.5C16.6605 7.5 17.5 8.33947 17.5 9.375C17.5 10.4105 16.6605 11.25 15.625 11.25C14.5895 11.25 13.75 10.4105 13.75 9.375C13.75 8.33947 14.5895 7.5 15.625 7.5Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

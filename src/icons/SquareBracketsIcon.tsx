
import { Icon } from '~/types'
import { color } from '~/utils'

export const SquareBracketsIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      fill={color(colorProp)}
      {...props}
    >
      <path
        d="M0 18V0H5.04107V1.9693H2.42641V16.0378H5.04107V18H0Z"
        fill={color(colorProp)}
      />
      <path
        d="M16 0V18H10.9589V16.0378H13.5736V1.9693H10.9589V0H16Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

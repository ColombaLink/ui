
import { Icon } from '~/types'
import { color } from '~/utils'

export const EyeIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        fill={color(colorProp)}
        fillOpacity="0.87"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.882274 7.63113C1.87378 4.65047 4.68527 2.5 8.00035 2.5C11.3139 2.5 14.1243 4.64848 15.117 7.62697C15.1973 7.86768 15.1973 8.12812 15.1172 8.36887C14.1257 11.3495 11.3142 13.5 7.99918 13.5C4.68565 13.5 1.87522 11.3515 0.882492 8.37303C0.802265 8.13233 0.802188 7.87188 0.882274 7.63113ZM11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8Z"
        fill={color(colorProp)}
        fillOpacity="0.87"
      />
    </svg>
  )
}

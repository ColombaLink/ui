
import { Icon } from '~/types'
import { color } from '~/utils'

export const PenIcon = ({
  color: colorProp = 'currentColor',
  //  strokeWidth = 1.45,
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="transparent"
      {...props}
    >
      <path
        d="M16.7232 1.2767C15.9096 0.463106 14.5905 0.463106 13.7769 1.2767L12.8586 2.19508L15.8048 5.14135L16.7232 4.22297C17.5368 3.40938 17.5368 2.09029 16.7232 1.2767Z"
        fill={color(colorProp)}
      />
      <path
        d="M14.963 5.98315L12.0168 3.03687L2.37326 12.6804C1.88375 13.1699 1.52392 13.7737 1.32628 14.4371L0.691535 16.568C0.629138 16.7775 0.686557 17.0043 0.841104 17.1588C0.995651 17.3134 1.22247 17.3708 1.43193 17.3084L3.5628 16.6736C4.22626 16.476 4.83003 16.1162 5.31955 15.6267L14.963 5.98315Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

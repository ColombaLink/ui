
import { Icon } from '~/types'
import { color } from '~/utils'

export const CopyIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
      <path
        d="M4.1665 12.4998H3.33317C2.4127 12.4998 1.6665 11.7537 1.6665 10.8332V3.33317C1.6665 2.4127 2.4127 1.6665 3.33317 1.6665H10.8332C11.7537 1.6665 12.4998 2.4127 12.4998 3.33317V4.1665"
        stroke={color(colorProp)}
        strokeWidth="1.5"
      />
    </svg>
  )
}

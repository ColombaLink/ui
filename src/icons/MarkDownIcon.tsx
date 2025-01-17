
import { Icon } from '~/types'
import { color } from '~/utils'

export const MarkDownIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M0 15V5H2.58065L5.16129 8.67647L7.74194 5H10.3226V15H7.74194V9.26471L5.16129 12.9412L2.58065 9.26471V15H0ZM16.129 15L12.2581 10.1471H14.8387V5H17.4194V10.1471H20L16.129 15Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

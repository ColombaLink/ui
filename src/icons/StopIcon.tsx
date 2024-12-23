
import { Icon } from '~/types'
import { color } from '~/utils'

export const StopIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <rect x={5} y={5} width={10} height={10} fill={color(colorProp)} />
    </svg>
  )
}

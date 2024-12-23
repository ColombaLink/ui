
import { Icon } from '~/types'
import { color } from '~/utils'

export const MicrosoftIcon = ({ size = 16, ...props }: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M9.52455 0.952148H0.953125V9.52358H9.52455V0.952148Z"
        fill="#F25022"
      />
      <path
        d="M9.52455 10.4766H0.953125V19.048H9.52455V10.4766Z"
        fill="#00A4EF"
      />
      <path
        d="M19.048 0.952148H10.4766V9.52358H19.048V0.952148Z"
        fill="#7FBA00"
      />
      <path d="M19.048 10.4766H10.4766V19.048H19.048V10.4766Z" fill="#FFB900" />
    </svg>
  )
}

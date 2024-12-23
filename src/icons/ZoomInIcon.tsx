
import { Icon } from '~/types'
import { color } from '~/utils'

export const ZoomInIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.39827 7.33398C3.39827 4.75666 5.48761 2.66732 8.06494 2.66732C10.6423 2.66732 12.7316 4.75666 12.7316 7.33398C12.7316 8.59128 12.2344 9.73244 11.4259 10.5716C11.4031 10.5891 11.3811 10.6083 11.3602 10.6292C11.3393 10.6501 11.3201 10.6721 11.3025 10.6949C10.4634 11.5034 9.32224 12.0007 8.06494 12.0007C5.48761 12.0007 3.39827 9.91131 3.39827 7.33398ZM11.8101 12.0219C10.7836 12.843 9.48162 13.334 8.06494 13.334C4.75123 13.334 2.06494 10.6477 2.06494 7.33398C2.06494 4.02028 4.75123 1.33398 8.06494 1.33398C11.3787 1.33398 14.0649 4.02028 14.0649 7.33398C14.0649 8.75066 13.574 10.0527 12.7529 11.0791L15.203 13.5292C15.4634 13.7896 15.4634 14.2117 15.203 14.4721C14.9427 14.7324 14.5206 14.7324 14.2602 14.4721L11.8101 12.0219ZM8.06494 4.66732C8.43313 4.66732 8.73161 4.96579 8.73161 5.33398V6.66732H10.0649C10.4331 6.66732 10.7316 6.96579 10.7316 7.33398C10.7316 7.70217 10.4331 8.00065 10.0649 8.00065H8.73161V9.33398C8.73161 9.70217 8.43313 10.0007 8.06494 10.0007C7.69675 10.0007 7.39827 9.70217 7.39827 9.33398V8.00065H6.06494C5.69675 8.00065 5.39827 7.70217 5.39827 7.33398C5.39827 6.96579 5.69675 6.66732 6.06494 6.66732H7.39827V5.33398C7.39827 4.96579 7.69675 4.66732 8.06494 4.66732Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

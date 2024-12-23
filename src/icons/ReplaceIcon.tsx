
import { Icon } from '~/types'
import { color } from '~/utils'

export const ReplaceIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2063 1.49835C9.10787 1.24983 7.96443 1.2836 6.88262 1.59651C5.80426 1.90843 4.82217 2.48759 4.02739 3.28021L2.06466 5.1245V2.66575C2.06466 2.29756 1.76618 1.99908 1.39799 1.99908C1.0298 1.99908 0.731325 2.29756 0.731325 2.66575V6.66422C0.731302 6.67356 0.731475 6.68291 0.731843 6.69226C0.734969 6.77221 0.752177 6.84856 0.781057 6.91887C0.805405 6.97825 0.838721 7.03489 0.88107 7.08678C0.895889 7.10495 0.911647 7.12233 0.928271 7.13883C1.04878 7.25849 1.21475 7.33242 1.39799 7.33242H5.39799C5.76618 7.33242 6.06466 7.03394 6.06466 6.66575C6.06466 6.29756 5.76618 5.99908 5.39799 5.99908H3.08101L4.94784 4.24491C4.95292 4.24014 4.95792 4.23529 4.96285 4.23036C5.59974 3.59315 6.38766 3.12767 7.25311 2.87734C8.11855 2.62701 9.0333 2.59999 9.91201 2.79881C10.7907 2.99763 11.6047 3.4158 12.2781 4.01431C12.9515 4.61282 13.4623 5.37216 13.7628 6.22147C13.8857 6.56857 14.2666 6.75038 14.6137 6.62755C14.9608 6.50472 15.1426 6.12377 15.0198 5.77668C14.6441 4.71504 14.0056 3.76586 13.1639 3.01773C12.3222 2.26959 11.3046 1.74687 10.2063 1.49835ZM16.0673 8.66574C16.4344 8.66702 16.7317 8.96501 16.7317 9.33241V13.3324C16.7317 13.7006 16.4332 13.9991 16.065 13.9991C15.6968 13.9991 15.3983 13.7006 15.3983 13.3324V10.8733L13.4353 12.7179C12.6405 13.5106 11.6584 14.0897 10.58 14.4016C9.49822 14.7146 8.35478 14.7483 7.25639 14.4998C6.15801 14.2513 5.14048 13.7286 4.29875 12.9804C3.45702 12.2323 2.81853 11.2831 2.44285 10.2215C2.32002 9.87437 2.50183 9.49342 2.84893 9.3706C3.19603 9.24777 3.57698 9.42958 3.6998 9.77668C4.00035 10.626 4.51114 11.3853 5.18452 11.9838C5.85791 12.5823 6.67193 13.0005 7.55064 13.1993C8.42935 13.3982 9.3441 13.3711 10.2095 13.1208C11.075 12.8705 11.8629 12.405 12.4998 11.7678C12.5047 11.7629 12.5097 11.758 12.5148 11.7532L14.3816 9.99907H12.065C11.6968 9.99907 11.3983 9.7006 11.3983 9.33241C11.3983 8.96422 11.6968 8.66574 12.065 8.66574H16.0627C16.0643 8.66574 16.0658 8.66574 16.0673 8.66574Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}

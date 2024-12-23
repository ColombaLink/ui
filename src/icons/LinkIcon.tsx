
import { Icon } from '~/types'
import { color } from '~/utils'

export const LinkIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6.29688 8.66697C6.58318 9.04972 6.94845 9.36642 7.36791 9.5956C7.78737 9.82477 8.25121 9.96105 8.72798 9.99519C9.20474 10.0293 9.68327 9.96055 10.1311 9.79349C10.5789 9.62643 10.9856 9.36502 11.3235 9.02697L13.3235 7.02697C13.9307 6.3983 14.2667 5.55629 14.2591 4.6823C14.2515 3.80831 13.901 2.97227 13.2829 2.35424C12.6649 1.73621 11.8289 1.38565 10.9549 1.37806C10.0809 1.37046 9.23888 1.70644 8.61021 2.31364L7.46354 3.45364"
        stroke={color(colorProp)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.96237 7.33283C8.67607 6.95008 8.3108 6.63338 7.89134 6.40421C7.47188 6.17503 7.00803 6.03875 6.53127 6.00461C6.05451 5.97047 5.57598 6.03925 5.12814 6.20631C4.6803 6.37337 4.27363 6.63479 3.93571 6.97283L1.93571 8.97283C1.32851 9.60151 0.992531 10.4435 1.00013 11.3175C1.00772 12.1915 1.35828 13.0275 1.97631 13.6456C2.59434 14.2636 3.43038 14.6142 4.30437 14.6217C5.17836 14.6293 6.02037 14.2934 6.64904 13.6862L7.78904 12.5462"
        stroke={color(colorProp)}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

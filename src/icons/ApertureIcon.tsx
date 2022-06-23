import React from 'react'

type ApertureIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export const ApertureIcon = ({
  color = 'currentColor',
  size = 20,
  ...props
}: ApertureIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.37416 5.91675L11.3283 2.53268C13.4523 2.90792 15.2712 4.16716 16.3913 5.91675H11.9379C11.9288 5.91658 11.9197 5.91658 11.9105 5.91675H9.37416ZM6.15008 8.50036L7.41507 6.30978C7.42146 6.29798 7.42817 6.28637 7.43517 6.27496L9.6588 2.42429C7.4685 2.5213 5.51971 3.54743 4.19696 5.11814L6.15008 8.50036ZM5.50748 10.3871L6.7757 12.5833H2.8681C2.57601 11.7771 2.41675 10.9072 2.41675 10.0001C2.41675 8.74058 2.7238 7.5528 3.26713 6.5075L5.4944 10.3645C5.49862 10.3721 5.50298 10.3796 5.50748 10.3871ZM10.6259 14.0833H8.08597H8.06511H3.6088C4.7289 15.8329 6.54774 17.0922 8.67166 17.4675L10.6259 14.0833ZM11.4921 12.5833H8.50784L7.01615 10.0001L8.50797 7.41675H11.492L12.9838 10.0001L11.4921 12.5833ZM12.571 13.7144C12.5736 13.71 12.5762 13.7056 12.5787 13.7012L13.8498 11.4999L15.803 14.8822C14.4802 16.4529 12.5314 17.4789 10.3412 17.5759L12.571 13.7144ZM9.0341 19.0327C9.3515 19.0662 9.67378 19.0834 10.0001 19.0834C12.9714 19.0834 15.6095 17.6567 17.2667 15.451C17.2984 15.4157 17.3264 15.3777 17.3505 15.3377C18.4405 13.8393 19.0834 11.9948 19.0834 10.0001C19.0834 8.72514 18.8207 7.51156 18.3466 6.41048C18.3358 6.38083 18.3232 6.35204 18.3089 6.32427C17.0353 3.4497 14.3138 1.35954 11.0695 0.979039C11.0344 0.972556 10.999 0.968652 10.9637 0.967256C10.6471 0.933868 10.3256 0.916748 10.0001 0.916748C7.03037 0.916748 4.39351 2.3419 2.73613 4.54558C2.70211 4.58303 2.6723 4.62352 2.64689 4.6663C1.55861 6.16402 0.916748 8.00709 0.916748 10.0001C0.916748 11.2731 1.17862 12.4849 1.65144 13.5847C1.66318 13.6177 1.67718 13.6497 1.69324 13.6804C2.96795 16.5533 5.68926 18.6417 8.93277 19.0214C8.96644 19.0275 9.00029 19.0312 9.0341 19.0327ZM14.5108 9.64499L16.7329 13.4929C17.2763 12.4476 17.5834 11.2597 17.5834 10.0001C17.5834 9.09296 17.4241 8.22303 17.132 7.41675H13.2241L14.487 9.60371C14.4954 9.61723 14.5033 9.631 14.5108 9.64499Z"
        fill={color}
      />
    </svg>
  )
}

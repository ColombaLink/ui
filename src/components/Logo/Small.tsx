import { SVGProps, FC } from 'react'

export const SmallLogo: FC<SVGProps<SVGSVGElement>> = ({ style, ...props }) => {
  return (
    <svg
      fill="none"
      height="80"
      viewBox="0 0 80 80"
      width="80"
      {...props}
      style={{
        ...style,
        cursor: props.onClick ? 'pointer' : null,
      }}
    >
      <path
        d="m60.822 26.3984-19.0829 19.0829h-19.0829l19.0829-19.0829z"
        fill="#4b41ff"
      />
      <path
        d="m65.3125 45.481-19.0829 19.0828h-23.5734l19.0829-19.0828z"
        fill="#ff1f85"
      />
      <path
        d="m41.7391 8.4375-19.0829 19.0829v17.9606l19.0829-19.0829z"
        fill="#008cff"
      />
    </svg>
  )
}

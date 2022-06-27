import React, { CSSProperties, FC, ReactNode } from 'react'
import { AvatarSize, Color, Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type AvatarProps = {
  size?: AvatarSize
  backgroundColor?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  children?: FC | ReactNode
  space?: Space
  style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = ({
  size = 32,
  backgroundColor,
  backgroundImg,
  icon,
  children,
  space,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: backgroundColor
          ? color(backgroundColor)
          : color('PrimaryMain'),
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <>{children}</>
      <>{icon}</>
    </div>
  )
}

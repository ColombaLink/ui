import React, { FC, ReactNode } from 'react'
import { AvatarSize, Color, Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type AvatarProps = {
  size?: AvatarSize
  backgroundColor?: Color
  backgroundImg?: string
  children?: ReactNode
  space?: Space
}

export const Avatar: FC<AvatarProps> = ({
  size = 32,
  backgroundColor,
  backgroundImg,
  children,
  space,
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
      }}
    >
      {children}
    </div>
  )
}

import React, { FC, ReactNode, CSSProperties } from 'react'
import { AvatarSize, Color, Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type ThumbnailProps = {
  size?: AvatarSize
  children?: ReactNode
  backgroundColor?: Color
  space?: Space
  style?: CSSProperties
}

export const Thumbnail: FC<ThumbnailProps> = ({
  children,
  size = 40,
  backgroundColor,
  space,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor
          ? color(backgroundColor)
          : color('AccentPurpleLight'),
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spaceToPx(space),
        width: size,
        height: size,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

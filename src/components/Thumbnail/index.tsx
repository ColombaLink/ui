import React, { FC, ReactNode, CSSProperties } from 'react'
import { AvatarSize, Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'

type ThumbnailProps = {
  size?: AvatarSize
  children?: ReactNode
  backgroundColor?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  color?: Color
  space?: Space
  style?: CSSProperties
}

export const Thumbnail: FC<ThumbnailProps> = ({
  children,
  size = 40,
  backgroundColor,
  backgroundImg,
  color: colorProp,
  icon,
  space,
  style,
}) => {
  if (!backgroundColor) {
    if (colorProp && isCapitalised(colorProp)) {
      backgroundColor = `${colorProp}Light` as Color
    } else {
      backgroundColor = 'PrimaryMain'
    }
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor
          ? color(backgroundColor)
          : color('AccentPurpleLight'),
        borderRadius: 4,
        color: color(colorProp),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: spaceToPx(space),
        width: size,
        height: size,
        ...style,
      }}
    >
      {children}
      <>{renderOrCreateElement(icon, { size: 20 })}</>
    </div>
  )
}

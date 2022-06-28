import React, { CSSProperties, FC, ReactNode } from 'react'
import { AvatarSize, Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'

type AvatarProps = {
  size?: AvatarSize
  backgroundColor?: Color
  color?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  children?: FC | ReactNode
  space?: Space
  style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = ({
  size = 32,
  color: colorProp,
  backgroundColor,
  backgroundImg,
  icon,
  children,
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color(backgroundColor),
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: spaceToPx(space),
        color: color(colorProp),
        ...style,
      }}
    >
      <>{children}</>
      <>{renderOrCreateElement(icon)}</>
    </div>
  )
}

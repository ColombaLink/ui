import React, { FC, ReactNode, CSSProperties } from 'react'
import { Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'

type ThumbnailProps = {
  size?: 32 | 36 | 40 | 64
  backgroundColor?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  color?: Color
  space?: Space
  style?: CSSProperties
}

export const Thumbnail: FC<ThumbnailProps> = ({
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
      backgroundColor = `${colorProp}Accent` as Color
    } else {
      backgroundColor = 'PrimaryMain'
    }
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor
          ? color(backgroundColor)
          : color('BlueBabyAccent'),
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
      <>{renderOrCreateElement(icon, { size: 20 })}</>
    </div>
  )
}

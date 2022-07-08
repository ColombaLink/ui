import React, { FC, ReactNode, CSSProperties } from 'react'
import { Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'
import { Text } from '../Text'

type ThumbnailProps = {
  size?: 32 | 36 | 40 | 64
  backgroundColor?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  color?: Color
  space?: Space
  style?: CSSProperties
  label?: string
}

export const Thumbnail: FC<ThumbnailProps> = ({
  size = 40,
  backgroundColor,
  backgroundImg,
  color: colorProp,
  icon,
  space,
  style,
  label,
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
      {label && !icon && !backgroundImg ? (
        <Text
          color={color(colorProp)}
          // @ts-ignore
          size={size / 2}
        >
          {label[0].toLocaleUpperCase()}
        </Text>
      ) : null}
      <>{renderOrCreateElement(icon, { size: 20 })}</>
    </div>
  )
}

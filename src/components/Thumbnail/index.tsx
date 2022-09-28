import React, { FC, ReactNode, CSSProperties } from 'react'
import { Color, Size, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { Text } from '../Text'

type ThumbnailProps = {
  size?: 32 | 36 | 40 | 48 | 64
  img?: string
  icon?: FC | ReactNode
  color?: Color
  space?: Space
  style?: CSSProperties
  label?: string
}

export const Thumbnail: FC<ThumbnailProps> = ({
  size = 40,
  img,
  color: colorProp = 'accent',
  icon,
  space,
  style,
  label,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: color(colorProp),
        borderRadius: 4,
        color: color(colorProp, 'contrast'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: img ? `url(${img})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: spaceToPx(space),
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    >
      {label ? (
        <Text color="inherit" size={(size / 2) as Size}>
          {label[0].toUpperCase()}
        </Text>
      ) : icon ? (
        renderOrCreateElement(icon, { size: size > 40 ? 20 : 16 })
      ) : null}
    </div>
  )
}

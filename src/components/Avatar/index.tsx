import React, { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react'
import { AccentColor, Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'
import { Text } from '../Text'

type AvatarSizeInt = 32 | 36 | 40 | 64
export type AvatarSize = `${AvatarSizeInt}px` | AvatarSizeInt

type AvatarProps = {
  size?: 32 | 36 | 40 | 64
  color?: AccentColor
  img?: string
  icon?: FC | ReactNode
  space?: Space
  label?: string
  onClick?: (e: SyntheticEvent) => void
  style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = ({
  size = 32,
  color: colorProp = 'accent',
  img,
  icon,
  label,
  space,
  onClick,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : null,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color(colorProp),
        backgroundImage: img ? `url(${img})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: spaceToPx(space),
        color: color(colorProp, 'contrast'),
        ...style,
      }}
      onClick={onClick}
    >
      {/* <>{children}</> */}
      {label && !icon && !img ? (
        <Text
          color={colorProp}
          variant="contrast"
          // @ts-ignore
          size={size / 2}
        >
          {label[0].toLocaleUpperCase()}
        </Text>
      ) : null}
      <>{renderOrCreateElement(icon)}</>
    </div>
  )
}

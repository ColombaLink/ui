import React, { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react'
import { Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'
import { Text } from '../Text'

type AvatarSizeInt = 32 | 36 | 40 | 64
export type AvatarSize = `${AvatarSizeInt}px` | AvatarSizeInt

type AvatarProps = {
  size?: 32 | 36 | 40 | 64
  backgroundColor?: Color
  color?: Color
  backgroundImg?: string
  icon?: FC | ReactNode
  // children?: ReactNode
  space?: Space
  label?: string
  onClick?: (e: SyntheticEvent) => void
  style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = ({
  size = 32,
  color: colorProp,
  backgroundColor,
  backgroundImg,
  icon,
  label,
  // children,
  space,
  onClick,
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : null,
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
      onClick={onClick}
    >
      {/* <>{children}</> */}
      {label ? (
        <Text color={'Background1dp'}>{label[0].toLocaleUpperCase()}</Text>
      ) : null}
      <>{renderOrCreateElement(icon)}</>
    </div>
  )
}

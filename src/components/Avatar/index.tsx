import React, { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react'
import { AccentColor, Color, Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { getButtonStyle } from '~'
import { Text } from '../Text'
import { styled } from 'inlines'

type AvatarSizeInt = 24 | 32 | 36 | 40 | 64
export type AvatarSize = `${AvatarSizeInt}px` | AvatarSizeInt

export type AvatarProps = {
  size?: AvatarSize
  color?: AccentColor
  img?: string
  icon?: FC | ReactNode
  space?: Space
  label?: string
  onClick?: (e: SyntheticEvent) => void
  style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = (props) => {
  if (!props.color) {
    props.color = 'accent'
  }

  const {
    size = 32,
    color: colorProp,
    img,
    icon,
    label,
    space,
    onClick,
    style,
    ...rest
  } = props

  return (
    <styled.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundImage: img ? `url(${img})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: spaceToPx(space),
        ...getButtonStyle(props),
        ...style,
      }}
      onClick={onClick}
      {...rest}
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
    </styled.div>
  )
}

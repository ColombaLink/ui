import React, {
  CSSProperties,
  FC,
  SyntheticEvent,
  FunctionComponent,
  ReactNode,
} from 'react'
import { Color, Size, Space, Icon } from '~/types'
import { spaceToPx, renderOrCreateElement } from '~/utils'
import { getButtonStyle } from '~'
import { Text } from '../Text'
import { styled } from 'inlines'

export type AvatarProps = {
  size?: Size
  color?: Color
  img?: string
  icon?: FunctionComponent<Icon> | ReactNode
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
      {label && !icon && !img ? (
        <Text
          color={colorProp}
          variant="contrast"
          size={
            (typeof size === 'number' ? size / 2 : parseInt(size) / 2) as Size
          }
          style={{ lineHeight: '32px' }}
        >
          {label[0].toLocaleUpperCase()}
        </Text>
      ) : null}
      <>{renderOrCreateElement(icon)}</>
    </styled.div>
  )
}

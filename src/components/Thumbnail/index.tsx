import React, { FC, CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Color, Size, Icon } from '~/types'
import { color, renderOrCreateElement, boxShadow } from '~/utils'
import { Text } from '../Text'
import { styled } from 'inlines'

type ThumbnailProps = {
  size?: Size
  img?: string
  icon?: FunctionComponent<Icon> | ReactNode
  color?: Color
  style?: CSSProperties
  label?: string
  outline?: boolean
  counter?: number
}

const CounterBadge = styled('div', {
  width: 20,
  height: 20,
  borderRadius: 10,
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  position: 'absolute',
  right: -10,
  top: -10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: boxShadow('small'),
})

export const Thumbnail: FC<ThumbnailProps> = ({
  size = 40,
  img,
  color: colorProp = 'accent',
  icon,
  style,
  label,
  outline,
  counter,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: color(colorProp),
        borderRadius: 8,
        color: color(colorProp, 'contrast'),
        // @ts-ignore
        border: outline ? `1px solid ${color(colorProp + ':hover')}` : 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: img ? `url(${img})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        position: 'relative',
        minWidth: size,
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    >
      {counter && (
        <CounterBadge>
          <Text typography="caption600">{counter}</Text>
        </CounterBadge>
      )}
      {label ? (
        <Text
          color="inherit"
          size={(+size / 2) as Size}
          style={{ lineHeight: '32px' }}
        >
          {label[0].toUpperCase() + label[1].toUpperCase()}
        </Text>
      ) : icon ? (
        renderOrCreateElement(icon, { size: size > 40 ? 20 : 16 })
      ) : null}
    </div>
  )
}

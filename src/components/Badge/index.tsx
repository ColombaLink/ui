import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space } from '~/types'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { Text } from '../Text'

type BadgeProps = {
  children: ReactNode
  style?: CSSProperties
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  light?: boolean
}

export const Badge: FC<BadgeProps> = ({
  children,
  iconLeft,
  iconRight,
  style,
  outline,
  light,
}) => {
  return (
    <div
      style={{
        padding: '0 8px',
        borderRadius: 12,
        minHeight: 24,
        display: 'flex',
        alignItems: 'center',
        border: outline ? `1px solid ${color('OtherDivider')}` : null,
        backgroundColor: outline
          ? null
          : color(light ? 'PrimaryLight' : 'PrimaryMain'),
        ...style,
      }}
    >
      {renderOrCreateElement(iconLeft, {
        size: 10,
        style: {
          marginRight: 8,
        },
      })}
      <Text
        size="11px"
        color={
          outline
            ? null
            : light
            ? 'PrimaryLightContrast'
            : 'PrimaryMainContrast'
        }
      >
        {children}
      </Text>
      {renderOrCreateElement(iconRight, {
        size: 10,
        style: {
          marginLeft: 8,
        },
      })}
    </div>
  )
}

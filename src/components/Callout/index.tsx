import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space, Color } from '~/types'
import { Text } from '../Text'
import { border, color, renderOrCreateElement, spaceToPx } from '~/utils'

type CalloutProps = {
  children?: ReactNode
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  color?: Color
  ghost?: boolean
  space?: Space
  style?: CSSProperties
  textAlign?: 'center' | 'right'
}

export const Callout: FC<CalloutProps> = ({
  children,
  iconLeft,
  iconRight,
  outline,
  color: colorProp = 'accent',
  ghost,
  space,
  style,
  textAlign,
}) => {
  return (
    <div
      style={{
        border: outline ? border(1, colorProp, 'border', true) : null,
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        display: 'flex',
        padding: '12px 16px',
        borderRadius: 4,
        marginBottom: spaceToPx(space),
        justifyContent:
          textAlign === 'center'
            ? 'center'
            : textAlign === 'right'
            ? 'flex-end'
            : 'flex-start',
        ...style,
      }}
    >
      {iconLeft && (
        <div style={{ marginRight: 12, flexShrink: 0, paddingTop: 4 }}>
          {renderOrCreateElement(iconLeft, {
            color: color(colorProp),
          })}
        </div>
      )}
      <Text wrap color={color(colorProp, 'contrast', true)}>
        {children}
      </Text>
      {iconRight && (
        <div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, {
            color: color(colorProp),
          })}
        </div>
      )}
    </div>
  )
}

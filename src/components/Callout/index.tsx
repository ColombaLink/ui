import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space } from '~/types'
import { Text } from '../Text'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'

type CalloutProps = {
  children?: string
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  ghost?: boolean
  error?: boolean
  space?: Space
  style?: CSSProperties
  textAlign?: 'center' | 'right'
}

export const Callout: FC<CalloutProps> = ({
  children,
  iconLeft,
  iconRight,
  outline,
  ghost,
  error,
  space,
  style,
  textAlign,
}) => {
  return (
    <div
      style={{
        border:
          outline && error
            ? `1px solid ${color('ErrorMain')}`
            : outline
            ? `1px solid ${color('OtherDivider')}`
            : null,
        backgroundColor: ghost
          ? null
          : error
          ? color('ErrorLight')
          : color('PrimaryLight'),
        display: 'flex',
        alignItems: 'center',
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
        <div style={{ marginRight: 8 }}>
          {renderOrCreateElement(iconLeft, {
            color: error ? color('ErrorMain') : color('inherit'),
          })}
        </div>
      )}
      <Text color={error ? 'ErrorMain' : 'TextPrimary'}>{children}</Text>
      {iconRight && (
        <div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, {
            color: error ? color('ErrorMain') : color('inherit'),
          })}
        </div>
      )}
    </div>
  )
}

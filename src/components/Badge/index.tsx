import React, { CSSProperties, FC, ReactNode } from 'react'
import { color, renderOrCreateElement } from '~/utils'
import { Text } from '../Text'

type BadgeProps = {
  children: ReactNode
  style?: CSSProperties
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  light?: boolean
  boxed?: boolean
  ghost?: boolean
  action?: boolean
}

export const Badge: FC<BadgeProps> = ({
  children,
  iconLeft,
  iconRight,
  style,
  outline,
  light,
  boxed,
  ghost,
  action,
}) => {
  return (
    <div
      style={{
        padding: '0 8px',
        borderRadius: boxed ? 4 : 12,
        minHeight: 24,
        maxWidth: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        border: outline ? `1px solid ${color('OtherDivider')}` : null,
        backgroundColor: ghost
          ? null
          : color(
              action && light
                ? 'ActionLight'
                : action
                ? 'ActionMain'
                : light
                ? 'PrimaryLight'
                : 'PrimaryMain'
            ),

        ...style,
      }}
    >
      {iconLeft && (
        <div style={{ marginRight: 8 }}>
          {renderOrCreateElement(iconLeft, { size: 10 })}
        </div>
      )}
      <Text
        size="12px"
        color={
          outline || ghost || (action && light)
            ? null
            : light
            ? 'PrimaryLightContrast'
            : 'PrimaryMainContrast'
        }
      >
        {children}
      </Text>
      {iconRight && (
        <div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, { size: 10 })}
        </div>
      )}
    </div>
  )
}

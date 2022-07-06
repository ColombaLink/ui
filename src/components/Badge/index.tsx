import React, { CSSProperties, FC, ReactNode } from 'react'
import { color, renderOrCreateElement } from '~/utils'
import { Color } from '~/types'
import { Text } from '../Text'
import { isCapitalised } from '~/utils/isCapitalised'
import { styled } from 'inlines'

type BadgeProps = {
  children: ReactNode
  style?: CSSProperties
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  color?: Color
  backgroundColor?: Color
  foregroundColor?: Color
  outlineColor?: Color
  hoverColor?: Color
  boxed?: boolean
  ghost?: boolean
}

export const Badge: FC<BadgeProps> = ({
  children,
  iconLeft,
  iconRight,
  style,
  outline,
  color: colorProp,
  backgroundColor,
  foregroundColor,
  outlineColor,
  hoverColor,
  boxed,
  ghost,
}) => {
  if (!backgroundColor) {
    if (colorProp && isCapitalised(colorProp)) {
      backgroundColor = `${colorProp}Accent` as Color
    } else {
      backgroundColor = 'PrimaryLightAccent'
    }
  }

  if (!foregroundColor) {
    if (colorProp && isCapitalised(colorProp)) {
      foregroundColor = `${colorProp}Foreground` as Color
    } else {
      foregroundColor = 'TextPrimary'
    }
  }

  if (!outlineColor) {
    if (colorProp && isCapitalised(colorProp)) {
      outlineColor = `${colorProp}Active` as Color
    } else {
      outlineColor = 'OtherDivider'
    }
  }

  if (!hoverColor) {
    if (colorProp && isCapitalised(colorProp)) {
      hoverColor = `${colorProp}Hover` as Color
    } else {
      hoverColor = `${colorProp}Accent` as Color
    }
  }

  if (ghost) {
    backgroundColor = 'Transparent'
  }

  return (
    <styled.div
      style={{
        padding: '0 8px',
        borderRadius: boxed ? 4 : 12,
        minHeight: 24,
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        border: outline ? `1px solid ${color(outlineColor)}` : null,
        backgroundColor: color(backgroundColor),
        '&:hover': {
          backgroundColor: color(hoverColor),
        },

        ...style,
      }}
    >
      {iconLeft && (
        <div style={{ marginRight: 8 }}>
          {renderOrCreateElement(iconLeft, {
            size: 10,
            color: color(colorProp),
          })}
        </div>
      )}
      <Text size="12px" color={color(foregroundColor)}>
        {children}
      </Text>
      {iconRight && (
        <div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, {
            size: 10,
            color: color(colorProp),
          })}
        </div>
      )}
    </styled.div>
  )
}

import React, {
  CSSProperties,
  FC,
  ReactChild,
  ReactChildren,
  ReactNode,
} from 'react'
import { Space, Color } from '~/types'
import { Text } from '../Text'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { isCapitalised } from '~/utils/isCapitalised'

type CalloutProps = {
  children?: string | ReactChildren | ReactChild
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  outlineColor?: Color
  color?: Color
  ghost?: boolean
  backgroundColor?: Color
  foregroundColor?: Color
  space?: Space
  style?: CSSProperties
  textAlign?: 'center' | 'right'
}

export const Callout: FC<CalloutProps> = ({
  children,
  iconLeft,
  iconRight,
  outline,
  outlineColor,
  color: colorProp,
  ghost,
  backgroundColor,
  foregroundColor,
  space,
  style,
  textAlign,
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

  if (ghost) {
    backgroundColor = 'Transparent'
  }

  return (
    <div
      style={{
        border: outline ? `1px solid ${color(outlineColor)}` : null,
        backgroundColor: color(backgroundColor),
        display: 'flex',
        // alignItems: 'center',
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
      <Text wrap color={color(foregroundColor)}>
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

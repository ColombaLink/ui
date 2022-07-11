import React, {
  CSSProperties,
  FC,
  ReactNode,
  MouseEventHandler,
  useCallback,
} from 'react'
import { border, color, renderOrCreateElement } from '~/utils'
import { AccentColor } from '~/types'
import { Text } from '../Text'
import { styled } from 'inlines'

type BadgeProps = {
  children: ReactNode
  style?: CSSProperties
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  outline?: boolean
  color?: AccentColor
  boxed?: boolean
  ghost?: boolean
  onClick?: MouseEventHandler
}

export const Badge: FC<BadgeProps> = ({
  children,
  iconLeft,
  iconRight,
  style,
  outline,
  color: colorProp = 'accent',
  onClick,
  boxed,
  ghost,
}) => {
  if (ghost) {
    console.warn('badge: implement ghost!')
  }

  // make this into a hook
  return (
    <styled.div
      onClick={
        onClick
          ? useCallback(
              (e) => {
                const t = e.currentTarget
                t.style.transform = 'scale(1.15)'
                setTimeout(() => {
                  t.style.transform = 'scale(1)'
                }, 100)
                onClick(e)
              },
              [onClick]
            )
          : null
      }
      style={{
        transition: 'transform 0.15s',
        transform: 'scale(1)',
        cursor: onClick ? 'pointer' : 'default',
        padding: '0 8px',
        borderRadius: boxed ? 4 : 12,
        minHeight: 24,
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: color(colorProp, 'contrast', true),
        border: border(outline && 1, colorProp, 'border', true),
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        '&:hover': {
          backgroundColor: color(colorProp, 'hover', true),
        },
        ...style,
      }}
    >
      {iconLeft && (
        <div
          style={{
            marginRight: 8,
            minWidth: 10,
            maxWidth: '100%',
            height: 'auto',
          }}
        >
          {renderOrCreateElement(iconLeft, { size: 10 })}
        </div>
      )}
      <Text size="12px" color="inherit">
        {children}
      </Text>
      {iconRight && (
        <div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, { size: 10 })}
        </div>
      )}
    </styled.div>
  )
}

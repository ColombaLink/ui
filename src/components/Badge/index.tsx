import React, { CSSProperties, FC, ReactNode, FunctionComponent } from 'react'
import { border, color, renderOrCreateElement } from '~/utils'
import { Color, Icon } from '~/types'
import { Text } from '../Text'
import { styled } from 'inlines'

type BadgeProps = {
  children: ReactNode
  style?: CSSProperties
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  outline?: boolean
  color?: Color
  boxed?: boolean
  ghost?: boolean
  onClick?: (() => void) | boolean
}

export const Badge: FC<BadgeProps> = ({
  children,
  icon,
  iconRight,
  style,
  outline,
  color: colorProp = 'text',
  onClick,
  boxed,
  ghost,
  ...props
}) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        minHeight: 24,
        transition: 'transform 0.15s',
        transform: 'scale(1)',
        cursor: onClick ? 'pointer' : null,
        padding: '0 8px',
        borderRadius: boxed ? 4 : 12,
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: color(colorProp, 'contrast', true),
        border: border(outline && 1, colorProp, 'border', true),
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        '@media (hover: hover)': {
          '&:hover': onClick
            ? {
                backgroundColor: color(colorProp, 'hover', true),
              }
            : null,
        },
        ...style,
      }}
      {...props}
    >
      {icon && (
        <div
          style={{
            marginRight: 8,
            minWidth: 10,
            maxWidth: '100%',
            height: 'auto',
          }}
        >
          {renderOrCreateElement(icon, { size: 10 })}
        </div>
      )}
      <Text typo="caption500" color="inherit">
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

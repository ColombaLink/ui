import React, { FC, ReactNode } from 'react'
import { Label } from '../Label'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { styled, Style } from 'inlines'
import { Text } from '../Text'

type CardProps = {
  label?: string
  description?: string
  space?: Space
  style?: Style
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
  bottomRight?: ReactNode
  bottomLeft?: ReactNode
  children?: ReactNode
  small?: boolean
  onClick?: () => void
}

export const Card: FC<CardProps> = ({
  label,
  description,
  space,
  style,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
  small,
  ...props
}) => {
  return (
    <styled.div
      style={{
        borderRadius: 8,
        padding: 16,
        backgroundColor: color('background2dp'),
        border: `1px solid ${color('border')}`,
        maxWidth: small ? 280 : 302,
        marginBottom: spaceToPx(space),
        cursor: props.onClick ? 'pointer' : null,
        '@media (hover: hover)': {
          '&:hover': props.onClick
            ? {
                backgroundColor: color('background:hover'),
              }
            : null,
        },
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          // marginBottom: 12,
        }}
      >
        {(topLeft || label || description) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginRight: 12,
            }}
          >
            {renderOrCreateElement(topLeft)}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Label label={label} space="2px" />
              <Text typo="caption400" color="text2">
                {description}
              </Text>
            </div>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginLeft: 12,
          }}
        >
          {renderOrCreateElement(topRight)}
        </div>
      </div>
      <div>{children}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {bottomLeft}
        {bottomRight}
      </div>
    </styled.div>
  )
}

import React, { CSSProperties, FC, ReactNode } from 'react'
import { Text } from '../Text'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'

type CardProps = {
  label?: string
  description?: string
  space?: Space
  style?: CSSProperties
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
  bottomRight?: ReactNode
  bottomLeft?: ReactNode
  children?: ReactNode
  small?: boolean
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
}) => {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 16,
        backgroundColor: color('background2dp'),
        border: `1px solid ${color('border')}`,
        maxWidth: small ? 280 : 302,
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          marginBottom: small ? null : 44,
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
              <Text weight={600}>{label}</Text>
              <Text weight={400} size="13px" color="text2">
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
    </div>
  )
}

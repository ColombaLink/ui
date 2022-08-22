import React, { CSSProperties, FC, ReactNode } from 'react'
import { Text } from '../Text'
import { Label } from '../Label'
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
  ...props
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
      {...props}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          marginBottom: 12,
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
              {label || description || children ? (
                <Label
                  label={label}
                  description={
                    <span
                      style={{
                        fontSize: 13,
                        marginTop: 0,
                        display: 'block',
                        lineHeight: '1.25',
                      }}
                    >
                      {description}
                    </span>
                  }
                  descriptionColor={color('text2')}
                />
              ) : null}
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

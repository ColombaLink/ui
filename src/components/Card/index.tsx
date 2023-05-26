import React, { FC, ReactNode } from 'react'
import {
  Text,
  RowSpaced,
  Row,
  Column,
  Label,
  color,
  renderOrCreateElement,
  styled,
  Style,
} from '~'

type CardProps = {
  label?: ReactNode
  description?: string
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
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        padding: 16,
        backgroundColor: color('background2dp'),
        border: `1px solid ${color('border')}`,
        maxWidth: small ? 280 : 302,
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
      <RowSpaced
        style={{
          position: 'relative',
        }}
      >
        {(topLeft || label || description) && (
          <Row
            style={{
              gap: 12,
              marginRight: 12,
            }}
          >
            {renderOrCreateElement(topLeft)}
            <Column>
              <Label label={label} style={{ marginBottom: 2 }} />
              <Text typography="caption400" color="text2">
                {description}
              </Text>
            </Column>
          </Row>
        )}
        <Row
          style={{
            gap: 12,
            marginLeft: 12,
          }}
        >
          {renderOrCreateElement(topRight)}
        </Row>
      </RowSpaced>
      <styled.div
        style={{
          flexGrow: 1,
        }}
      >
        {children}
      </styled.div>
      <RowSpaced>
        {bottomLeft}
        {bottomRight}
      </RowSpaced>
    </styled.div>
  )
}

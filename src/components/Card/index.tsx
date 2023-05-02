import React, { FC, ReactNode } from 'react'
import {
  Space,
  Text,
  RowSpaced,
  Row,
  Column,
  Label,
  color,
  spaceToPx,
  renderOrCreateElement,
  styled,
  Style,
} from '~'

type CardProps = {
  label?: ReactNode
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
              <Label label={label} space="2px" />
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
      <styled.div>{children}</styled.div>
      <RowSpaced>
        {bottomLeft}
        {bottomRight}
      </RowSpaced>
    </styled.div>
  )
}

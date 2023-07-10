import React, { ReactNode, FunctionComponent } from 'react'
import { Text, Color, Style, Row, Icon, renderOrCreateElement } from '~'

type LabelProps = {
  label?: ReactNode
  labelColor?: Color
  wrap?: boolean
  description?: ReactNode
  descriptionColor?: Color
  icon?: FunctionComponent<Icon> | ReactNode
  iconColor?: Color
  children?: ReactNode
  labelWidth?: number
  style?: Style
  direction?: 'row' | 'column'
}

export const Label = ({
  label,
  labelColor,
  description,
  wrap,
  descriptionColor,
  icon,
  iconColor: colorProp = 'accent',
  children,
  style,
  labelWidth,
  direction,
}: LabelProps) => {
  if (!label && !description && !icon) {
    return null
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: direction === 'row' ? 'center' : null,
        flexDirection: direction || 'column',
        ...style,
      }}
    >
      <div
        style={{
          minWidth: labelWidth,
          display: direction === 'row' ? 'flex' : null,
          marginRight: direction === 'row' ? 16 : 0,
          flexDirection: direction === 'row' ? 'column' : 'row',
        }}
      >
        <Row>
          {icon && (
            <div
              style={{
                display: 'inline-block',
                marginRight: 8,
                marginBottom: description ? 2 : 0,
              }}
            >
              {renderOrCreateElement(icon, {
                color: colorProp,
              })}
            </div>
          )}
          <Text
            wrap={wrap}
            style={{ marginBottom: description ? 0 : 0 }}
            color={labelColor || 'text'}
            typography="body600"
          >
            {label}
          </Text>
        </Row>
        {description && (
          <Text wrap typography="body500" color={descriptionColor || 'text2'}>
            {description}
          </Text>
        )}
      </div>
      {children}
    </div>
  )
}

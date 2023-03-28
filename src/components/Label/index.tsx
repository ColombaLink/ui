import React, { ReactNode, FunctionComponent } from 'react'
import {
  Text,
  Color,
  Style,
  spaceToPx,
  Space,
  Icon,
  renderOrCreateElement,
} from '~'

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
  space?: Space
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
  space,
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
        marginBottom: space ? spaceToPx(space) : 0,
        ...style,
      }}
    >
      <div
        style={{
          minWidth: labelWidth,
          display: direction === 'row' ? 'flex' : null,
          marginRight: direction === 'row' ? 16 : 0,
          flexDirection: direction === 'row' ? 'column' : 'row',
          marginTop: direction === 'row' ? 8 : 0,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
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
            typo="body600"
          >
            {label}
          </Text>
        </div>
        {description && (
          <Text wrap typo="body500" color={descriptionColor || 'text2'}>
            {description}
          </Text>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}

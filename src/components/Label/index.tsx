import React, { ReactNode, CSSProperties, FunctionComponent } from 'react'
import { Text, Color, spaceToPx } from '~'
import { Space, Icon } from '~/types'
import { renderOrCreateElement } from '~/utils'

type LabelProps = {
  label?: ReactNode
  labelColor?: Color
  wrap?: boolean
  description?: string
  descriptionColor?: Color
  icon?: FunctionComponent<Icon> | ReactNode
  iconColor?: Color
  children?: ReactNode
  labelWidth?: number
  space?: Space
  style?: CSSProperties
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
          display: 'flex',
          marginRight: direction === 'row' ? 16 : 0,
          flexDirection: direction === 'row' ? 'column' : 'row',
          alignItems: direction === 'row' ? null : 'center',
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

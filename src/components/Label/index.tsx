import React, { ReactNode, CSSProperties } from 'react'
import { Text, Color, spaceToPx } from '~'
import { Space } from '~/types'
import { renderOrCreateElement } from '~/utils'

type LabelProps = {
  label?: string | number | ReactNode
  labelColor?: Color
  description?: string | number | ReactNode
  descriptionColor?: Color
  icon?: ReactNode
  iconColor?: Color
  children?: ReactNode
  space?: Space
  style?: CSSProperties
}

export const Label = ({
  label,
  labelColor,
  description,
  descriptionColor,
  icon,
  space,
  iconColor: colorProp = 'accent',
  children,
  style,
}: LabelProps) => {
  if (!label && !description && !icon) {
    return null
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: space ? spaceToPx(space) : 0,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div
            style={{
              display: 'inline-block',
              marginRight: 8,
              marginBottom: description ? 4 : 0,
            }}
          >
            {renderOrCreateElement(icon, {
              color: colorProp,
            })}
          </div>
        )}
        <Text
          wrap
          style={{ marginBottom: description ? 4 : 0 }}
          color={labelColor || 'text'}
        >
          {label}
        </Text>
      </div>
      {description && (
        <Text wrap typo="body400" color={descriptionColor || 'text2'}>
          {description}
        </Text>
      )}
      <div>{children}</div>
    </div>
  )
}

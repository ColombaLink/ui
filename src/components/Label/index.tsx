import React, { ReactNode, CSSProperties } from 'react'
import { Color } from '~'
import { Text } from '~'
import { color, renderOrCreateElement } from '~/utils'

type LabelProps = {
  label?: string | number | ReactNode
  labelColor?: Color
  description?: string | number | ReactNode
  descriptionColor?: Color
  icon?: ReactNode
  iconColor?: Color
  children?: ReactNode
  style?: CSSProperties
}

export const Label = ({
  label,
  labelColor,
  description,
  descriptionColor,
  icon,
  iconColor: colorProp = 'accent',
  children,
  style,
}: LabelProps) => {
  if (!label && !description) {
    return null
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <Text
        wrap
        weight={600}
        color={labelColor ? color(labelColor) : color('text')}
      >
        {icon && (
          <div
            style={{
              display: 'inline-block',
              marginRight: 8,
              marginBottom: -2,
            }}
          >
            {renderOrCreateElement(icon, {
              color: color(colorProp),
            })}
          </div>
        )}
        {label}
      </Text>
      {description && (
        <Text
          wrap
          weight={400}
          color={descriptionColor ? color(descriptionColor) : color('text2')}
        >
          {description}
        </Text>
      )}
      <div>{children}</div>
    </div>
  )
}

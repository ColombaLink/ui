import React, { ReactNode, CSSProperties } from 'react'
import { Text } from '~'

type LabelProps = {
  label?: string | number | ReactNode
  description?: string
  children?: ReactNode
  style?: CSSProperties
}

export const Label = ({ label, description, children, style }: LabelProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',

        ...style,
      }}
    >
      <Text wrap weight={600}>
        {label}
      </Text>
      {description && (
        <Text wrap weight={400}>
          {description}
        </Text>
      )}
      <div>{children}</div>
    </div>
  )
}

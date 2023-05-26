import React, { CSSProperties, FC, ReactNode } from 'react'
import { border } from '~'

type SeparatorProps = {
  style?: CSSProperties
  children?: ReactNode
}

export const Separator: FC<SeparatorProps> = ({ children, style }) => {
  if (children) {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 12,
          alignItems: 'center',
          ...style,
        }}
      >
        <div
          style={{
            borderBottom: border(1),
            flexGrow: 1,
            marginRight: 16,
          }}
        />
        {children}
        <div
          style={{
            borderBottom: border(1),
            flexGrow: 1,
            marginLeft: 16,
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        borderBottom: border(1),
        height: 12,
        marginBottom: 12,
        ...style,
      }}
    />
  )
}

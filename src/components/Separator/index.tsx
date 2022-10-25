import React, { CSSProperties, FC } from 'react'
import { border } from '~'

type SeparatorProps = {
  style?: CSSProperties
}

export const Separator: FC<SeparatorProps> = ({ children, style }) => {
  if (children) {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 12,
          ...style,
        }}
      >
        <div
          style={{
            borderBottom: border(1),
            flexGrow: 1,
            height: 8,
            marginRight: 16,
          }}
        />
        <div style={{ display: 'flex' }}>{children}</div>
        <div
          style={{
            borderBottom: border(1),
            flexGrow: 1,
            height: 12,
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
        height: 8,
        marginBottom: 12,
        ...style,
      }}
    />
  )
}

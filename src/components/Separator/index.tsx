import React, { CSSProperties, FC } from 'react'
import { color } from '~'

type SeparatorProps = {
  style?: CSSProperties
}

export const Separator: FC<SeparatorProps> = ({ children, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 24,
        ...style,
      }}
    >
      <div
        style={{
          borderBottom: '1px solid ' + color('border'),
          display: 'flex',
          flexGrow: 1,
          height: 12,
          marginRight: 16,
        }}
      />
      {children ? (
        <>
          <div
            style={{
              display: 'flex',
            }}
          >
            {children}
          </div>
          <div
            style={{
              borderBottom: '1px solid ' + color('border'),
              display: 'flex',
              flexGrow: 1,
              height: 12,
              marginLeft: 16,
            }}
          />
        </>
      ) : null}
    </div>
  )
}

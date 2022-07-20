import React, { FC } from 'react'
import { color } from '~'

type SeparatorProps = {}

export const Separator: FC<SeparatorProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 24,
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

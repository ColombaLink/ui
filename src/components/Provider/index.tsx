import React, { createContext, FC } from 'react'
import { color } from '~/utils'

export const Context = createContext({
  theme: {},
})

export const Provider: FC = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: color('Background1dp'),
        color: color('TextPrimary'),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

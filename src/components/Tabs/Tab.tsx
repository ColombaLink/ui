import React, { FC, ReactNode, CSSProperties } from 'react'

type TabProps = {
  title?: string
  children?: FC | ReactNode
  style?: CSSProperties
  isActive?: boolean
}

export const Tab: FC<TabProps> = ({ children, style, title, isActive }) => {
  return (
    <div style={{ padding: 10, border: '1px solid black', margin: 5 }}>
      {children}
    </div>
  )
}

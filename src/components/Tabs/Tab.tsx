import React, { FC, ReactNode, CSSProperties } from 'react'

type TabProps = {
  title: string
  children?: ReactNode
  style?: CSSProperties
}

export const Tab: FC<TabProps> = ({ children, style, title }) => {
  return <div style={style}>{children}</div>
}

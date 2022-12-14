import React, { ReactNode, CSSProperties } from 'react'

type TabProps = {
  // label?: string
  children?: ReactNode | ReactNode[]
  style?: CSSProperties
  //  icon?: ReactNode
}

export const Tab = ({ children, style }: TabProps) => {
  return <div style={{ flexGrow: 1, ...style }}>{children}</div>
}

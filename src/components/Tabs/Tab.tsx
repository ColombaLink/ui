import React, { FC, ReactNode, CSSProperties } from 'react'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'

type TabProps = {
  label: string
  children?: ReactNode
  style?: CSSProperties
  icon?: ReactNode
}

export const Tab = ({ children, style, label, icon }: TabProps) => {
  return <div style={{ flexGrow: 1, ...style }}>{children}</div>
}

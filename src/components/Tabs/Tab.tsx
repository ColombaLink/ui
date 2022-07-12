import React, { FC, ReactNode, CSSProperties } from 'react'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'

type TabProps = {
  label: string
  children?: ReactNode
  style?: CSSProperties
  icon?: ReactNode
}

export const Tab: FC<TabProps> = ({ children, style, label, icon }) => {
  return <div style={style}>{children}</div>
}

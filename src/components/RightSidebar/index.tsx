import React, { CSSProperties, FC, ReactNode } from 'react'
import { color } from '~/utils'

type RightSidebarProps = {
  children?: FC | ReactNode
  style?: CSSProperties
}

export const RightSidebar: FC<RightSidebarProps> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: color('Background0dp'),
        height: 'calc(100vh - 66px)',
        padding: '20px 24px',
        width: 260,
        marginLeft: 'auto',
        borderLeft: `1px solid ${color('OtherDivider')}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

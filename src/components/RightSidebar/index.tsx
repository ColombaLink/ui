import React, { CSSProperties, FC, ReactNode } from 'react'
import { color } from '~/utils'

type RightSidebarProps = {
  children?: ReactNode
  style?: CSSProperties
}

export const RightSidebar: FC<RightSidebarProps> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: color('background2'),
        padding: '20px 24px',
        maxWidth: 240,
        marginLeft: 'auto',
        borderLeft: `1px solid ${color('border')}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

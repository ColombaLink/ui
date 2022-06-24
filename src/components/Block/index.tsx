import React, { CSSProperties, FC, ReactNode } from 'react'
import { color } from '~/utils'

type BlockProps = {
  children: ReactNode
  style?: CSSProperties
}

export const Block: FC<BlockProps> = ({ children, style }) => {
  return (
    <div
      style={{
        padding: '24px 24px 36px',
        backgroundColor: color('Background2dp'),
        border: `1px solid ${color('OtherDivider')}`,
        borderRadius: 4,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type BlockProps = {
  children: ReactNode
  space?: Space
  style?: CSSProperties
}

export const Block: FC<BlockProps> = ({ children, style, space }) => {
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: color('Background2dp'),
        border: `1px solid ${color('OtherDivider')}`,
        borderRadius: 4,
        marginBottom: spaceToPx(space, 32),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

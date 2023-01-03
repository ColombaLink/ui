import React, { CSSProperties, ReactNode } from 'react'
import { Space } from '~/types'
import { spaceToPx, color } from '~/utils'

type ListItemProps = {
  itemSize?: number
  space?: Space
  children?: ReactNode
  style?: CSSProperties
}

export const ListItem = ({
  itemSize = 56,
  children,
  space = 12,
  style,
}: ListItemProps) => {
  return (
    <div
      style={{
        borderRadius: 4,
        display: 'flex',
        maxHeight: itemSize - spaceToPx(space),
        alignItems: 'center',
        border: `1px solid ${color('border')}`,
        background: color('background2dp'),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

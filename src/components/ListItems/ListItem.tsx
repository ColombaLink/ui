import React, { CSSProperties, FC, ReactNode } from 'react'
import { DragDropIcon } from '~/icons'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type ListItemProps = {
  left?: ReactNode
  right?: ReactNode
  style?: CSSProperties
  space?: Space
  draggable?: boolean
}

export const ListItem: FC<ListItemProps> = ({
  left,
  right,
  style,
  draggable,
  space = 12,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: color('Background2dp'),
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${color('OtherDivider')}`,
        padding: '12px 20px',
        borderRadius: 4,
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {draggable && <DragDropIcon style={{ cursor: 'pointer' }} />}
        {left}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {right}
      </div>
    </div>
  )
}

import React, { CSSProperties, FC, ReactNode } from 'react'
import { DragDropIcon } from '~/icons'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'

type ListItemProps = {
  children?: FC | ReactNode
  childrenRight?: FC | ReactNode
  style?: CSSProperties
  space?: Space
  draggable?: boolean
}

export const ListItem: FC<ListItemProps> = ({
  children,
  childrenRight,
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
        {draggable && <DragDropIcon />}
        {children}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {childrenRight}
      </div>
    </div>
  )
}

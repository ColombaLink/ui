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
  id?: string
}

export const ListItem: FC<ListItemProps> = ({
  left,
  right,
  style,
  id,
  draggable,
  space = 4,
}) => {
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        backgroundColor: color('background2dp'),
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${color('border')}`,
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
        {draggable && (
          <DragDropIcon
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => {
              console.log(e.target.parentNode.parentNode.id)
              console.log('mouse down')
            }}
          />
        )}
        {left}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {right}
      </div>
    </div>
  )
}

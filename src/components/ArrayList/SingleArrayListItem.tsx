import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { color } from '~/utils'
import { Badge, DragDropIcon, Text, MoreIcon } from '~'

export const SingleArrayListItem = ({ itemType, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        border: `1px solid ${color('border')}`,
        borderRadius: 4,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 8,
        cursor: 'grab',
        ...style,
      }}
      {...attributes}
      {...listeners}
    >
      <DragDropIcon />
      <Badge style={{ marginLeft: 12, marginRight: 12 }}>{itemType}</Badge>
      <Text weight={600}>{props.id}</Text>
      <MoreIcon
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        // open options on clik
        onClick={(e) => console.log(e)}
      />
    </div>
  )
}

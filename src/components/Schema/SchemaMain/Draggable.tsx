import React, { CSSProperties, FC, useRef } from 'react'
import { color } from '~'
import { useSortable } from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'
import { getObjectId } from './utils'

export const Draggable: FC<{ id: string; objects: Set<string> }> = ({
  id,
  children,
  objects,
  overIdRef,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    index,
    activeIndex,
    overIndex,
    items,
  } = useSortable({ id })

  overIdRef.current =
    activeIndex > overIndex ? items[overIndex - 1] : items[overIndex]

  const objectId = overIdRef.current && getObjectId(overIdRef.current, objects)
  const indexRef = useRef<number>()
  const jumpedRef = useRef<boolean>()
  const style: CSSProperties = {
    height: 50,
    overflow: 'hidden',
    // opacity: isDragging ? 0.5 : 1,
    // visibility: isDragging ? 'hidden' : 'visible',
    transform: CSS.Transform.toString(transform),
    transition: transition,
    marginBottom: 12,
    marginLeft:
      isDragging && objectId ? (objectId.split('.').length + 1) * 12 : 0,
  }

  if (jumpedRef.current) {
    style.transform = null
    jumpedRef.current = null
  }

  jumpedRef.current =
    indexRef.current - index > 1 || index - indexRef.current > 1

  indexRef.current = index

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isDragging ? (
        <div
          style={{
            marginTop: 24,
            height: 2,
            backgroundColor: color('accent'),
          }}
        />
      ) : (
        children
      )}
    </div>
  )
}

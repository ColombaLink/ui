import React, { CSSProperties, useRef, useCallback } from 'react'
import useMultipleEvents from '~/hooks/useMultipleEvents'
import { useDrag, useDrop } from '~/hooks'
import { useSelect, useClick } from './hooks/useSelect'

type ListItemProps = {
  index?: number
  data?: any
  style?: CSSProperties
}

export const ListItem = ({
  data: { items, context },
  index,
  style,
}: ListItemProps) => {
  let {
    activeId,
    onDrop,
    exportData,
    draggable = true,
    showIndex,
    isActive: isActiveFn,
  } = context
  console.log('data', context)

  const ref = useRef<any>()

  const itemData = items[index]

  const wrappedData = {
    index,
    data: itemData,
    exportData,
  }

  const [drag, isDragging] = draggable ? useDrag(wrappedData, ref) : [{}, false]
  const [select, isSelected] = useSelect(wrappedData)
  const [drop, isDragOver, isDropLoading] = useDrop(
    useCallback(
      (e, { files, data }) => {
        if (onDrop) {
          if (data && data.length) {
            return onDrop(e, {
              targetIndex: index,
              data,
            })
          } else if (files) {
            return onDrop(e, { files, targetIndex: index })
          }
        }
      },
      [index, items]
    ),
    { readFiles: true }
  )

  console.log('isSelect', isSelected)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isSelected
          ? 'orange'
          : isDragging
          ? 'lightgreen'
          : index % 2 === 0
          ? 'lightblue'
          : '#f6f6f6',
        ...style,
      }}
      {...useMultipleEvents(drag, select)}
    >
      testing item {items[index]?.text} - {index}
    </div>
  )
}

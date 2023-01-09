import React, { CSSProperties, useRef, useCallback, useEffect } from 'react'
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
    onClick,
    activeId,
    onDrop,
    exportData,
    draggable = true,
    showIndex,
    isActive: isActiveFn,
  } = context
  // console.log('data', context)

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

  if (onDrop) {
    useEffect(() => {
      if (isDragOver || isDropLoading) {
        if (!ref.current || !ref.current.dragLayerActive) {
          const el = ref.current
          const p = el.parentNode
          const holder = p.parentNode
          let foundP = false
          holder.isDrop = el
          for (let i = 0; i < holder.children.length; i++) {
            const c = holder.children[i]
            if (c === p) {
              foundP = true
            }
            if (!foundP) {
              c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
            } else {
              c.children[1].style.transform = 'translate3d(0px, 40px, 0px)'
            }
          }
          ref.current.dragLayerActive = true
        }
      } else if (ref.current && ref.current.dragLayerActive) {
        ref.current.dragLayerActive = false
        const el = ref.current
        const p = el.parentNode
        const holder = p.parentNode
        if (holder.isDrop === el) {
          for (let i = 0; i < holder.children.length; i++) {
            const c = holder.children[i]
            c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
          }
          holder.isDrop = false
        }
      }
    }, [isDragOver, onDrop, isDropLoading])
  }

  // console.log('drop', drop, 'DRAGOVER???', isDragOver)

  // add style here to avoid the flickering error
  return (
    <div style={{ border: '1px solid grey', ...style }} {...drop}>
      {onDrop ? (
        <div
          style={{
            pointerEvents: 'none',
            opacity: isDragOver ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop: '2px solid purple',
            position: 'absolute',
          }}
        >
          Drop
        </div>
      ) : null}
      <div
        ref={ref}
        style={{
          height: 40,
          backgroundColor: isSelected
            ? 'orange'
            : isDragging
            ? 'lightgreen'
            : index % 2 === 0
            ? 'lightblue'
            : '#f6f6f6',
        }}
        {...useMultipleEvents(
          drag,
          select,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, wrappedData)
                  },
                  [onClick, wrappedData]
                ),
              }
            : undefined
        )}
      >
        testing item {items[index]?.text} - {index}
      </div>
    </div>
  )
}

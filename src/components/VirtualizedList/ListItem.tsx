import React, { CSSProperties, useRef, useCallback, useEffect } from 'react'
import useMultipleEvents from '~/hooks/useMultipleEvents'
import { useDrag, useDrop } from '~/hooks'
import { useSelect, useClick } from './hooks/useSelect'
import { color, renderOrCreateElement, stringToIcon } from '~/utils'
import { styled } from 'inlines'
import { Text } from '~/components/Text'
import { Checkbox } from '../Checkbox'
import { DragDropIcon } from '~/icons'

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
  const { onClick, onDrop, exportData, draggable = true } = context

  const ref = useRef<any>()

  const itemData = items[index]

  const wrappedData = {
    index,
    data: itemData,
    exportData,
  }

  // console.log('items', items)

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

  // add style here to avoid the flickering error
  return (
    <styled.div
      style={{
        '@media (hover: hover)': {
          '&:hover': {
            cursor: isDragging ? 'grabbing' : 'pointer',
          },
        },
      }}
      {...drop}
    >
      {onDrop ? (
        <div
          style={{
            pointerEvents: 'none',
            opacity: isDragOver ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop: `2px solid ${color('accent')}`,
            position: 'absolute',
            height: 30,
            ...style,
          }}
        />
      ) : null}
      <div
        ref={ref}
        style={{
          height: 30,
          border: `0px solid ${color('border')}`,
          borderRadius: 4,
          paddingLeft: 8,
          paddingRight: 8,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isSelected
            ? 'orange'
            : isDragging
            ? color('background2')
            : color('background'),
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
        <DragDropIcon size={16} style={{ marginRight: 8 }} />
        <Checkbox
          small
          value={items[index]?.checkbox}
          onChange={() => {
            items[index].checkbox = !items[index]?.checkbox
          }}
        />
        {renderOrCreateElement(items[index]?.thumbnail)}
        {/* {renderOrCreateElement(items[index]?.child)} */}
        {items[index]?.icon ? (
          <div style={{ marginRight: 8 }}>
            {stringToIcon(items[index]?.icon)}
          </div>
        ) : null}
        <Text typography="body600">{items[index]?.label}</Text>
      </div>
    </styled.div>
  )
}

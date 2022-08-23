import React, { CSSProperties, FC, useRef, useState, Ref } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SortableFixedSizeList, ChildrenProps } from 'react-window-sortable'
import { Space } from '~/types'
import { styled } from 'inlines'
import { DragDropIcon, MoreIcon, DuplicateIcon, DeleteIcon } from '~/icons'
import { ListItem } from './ListItem'
import { useContextMenu } from '~/hooks'
import { ContextItem } from '~'

type CustomListProps = {
  items?: any[]
  draggable?: boolean
  itemSize?: number
  itemSpace?: Space
  style?: CSSProperties
}

export const CustomList: FC<CustomListProps> = ({
  items,
  draggable,
  itemSpace = 0,
  itemSize = 56 + +itemSpace,
  style,
}) => {
  const [data, setData] = useState(items)

  const listRef = useRef<any>()

  const DragDropper = styled('div', {
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  })

  const More = styled(MoreIcon, {
    marginRight: 16,
    marginLeft: 'auto',
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  })

  const move = (arr: any[], from: number, to: number) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  // copy tempDiv to indicate dragging element
  const addDivToCursor = (e) => {
    let parentElWidth = e.target.parentElement.clientWidth
    let tempDivTest = e.target.parentNode
    let tempCopiedDiv = tempDivTest.cloneNode(true)

    tempCopiedDiv.setAttribute('id', 'tempCopiedDivId')
    tempCopiedDiv.style.width = parentElWidth ? parentElWidth + 'px' : '360px'

    document.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', movingMouse)

      function movingMouse(e) {
        if (tempCopiedDiv) {
          document.body.appendChild(tempCopiedDiv)
          tempCopiedDiv.style.position = 'absolute'
          tempCopiedDiv.style.left = `${e.clientX}px`
          tempCopiedDiv.style.top = `${e.clientY}px`
        }
      }

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', movingMouse)
        tempCopiedDiv = null
        document.getElementById('tempCopiedDivId')?.remove()
      })
    })
  }

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <SortableFixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={itemSize}
            itemData={data}
            onSortOrderChanged={({ originalIndex, newIndex }) => {
              move(data, originalIndex, newIndex)
              setData(data.slice(0))
            }}
            style={{ ...style }}
          >
            {React.forwardRef(
              (
                { data, index, style, onSortMouseDown }: ChildrenProps,
                ref: Ref<any>
              ) => (
                <div ref={ref}>
                  <ListItem
                    style={{ paddingLeft: draggable ? 0 : 16, ...style }}
                    itemSize={itemSize}
                    space={itemSpace}
                  >
                    {draggable && (
                      <DragDropper
                        onMouseDown={(e) => {
                          onSortMouseDown(e)
                          addDivToCursor(e)
                        }}
                        style={{ marginLeft: 16, marginRight: 16 }}
                      >
                        <DragDropIcon style={{ pointerEvents: 'none' }} />
                      </DragDropper>
                    )}
                    {data[index]}
                    <More
                      onClick={useContextMenu(
                        SimpleMenu,
                        {},
                        { placement: 'center' }
                      )}
                    />
                  </ListItem>
                </div>
              )
            )}
          </SortableFixedSizeList>
        )
      }}
    </AutoSizer>
  )
}

const SimpleMenu = () => {
  return (
    <>
      <ContextItem
        icon={DuplicateIcon}
        onClick={() => {
          console.log('hello')
        }}
      >
        Duplicate
      </ContextItem>
      <ContextItem icon={DeleteIcon}>Delete</ContextItem>
    </>
  )
}

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
  autoScrollDistance?: number
  maxItemWidth?: number
  client?: any
  schema?: any
  db?: any
  name?: string
}

export const CustomList: FC<CustomListProps> = ({
  items,
  draggable,
  itemSpace = 0,
  itemSize = 56 + +itemSpace,
  autoScrollDistance = 64,
  maxItemWidth,
  client,
  schema,
  db,
  name,
  style,
}) => {
  const [data, setData] = useState(items)

  console.log('DATA from CustomList', data)

  const listRef = useRef<any>()

  const DragDropper = styled('div', {
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  })

  schema = schema.schema
  const fields = schema.types?.[name]?.fields

  // console.log('items from custom list', items)
  // console.log('client from custom list', client)
  // console.log('schema from custom list', schema)
  // console.log('db from custom list', db)
  // console.log('name from custom list', name)

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
            autoScrollWhenDistanceLessThan={autoScrollDistance}
            ref={listRef}
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={itemSize}
            itemData={data}
            // @ts-ignore
            onSortOrderChanged={({ originalIndex, newIndex }) => {
              move(data, originalIndex, newIndex)
              setData(data.slice(0))
              // de data van de lijst items nu ook in schema zetten
              client
                .updateSchema({
                  schema: { types: { [name]: { fields } } },
                  db,
                })
                .catch((e) => console.error('error updating schema', e))

              // so this data in this component is in the right order

              console.log('now console.log the data:', data)
              // seems fine as well??
              console.log("now console.log the schema's data:", fields)
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
                    style={{
                      paddingLeft: draggable ? 0 : 16,
                      maxWidth: maxItemWidth || '100%',

                      transform: maxItemWidth ? 'translateX(-50%)' : 'none',
                      ...style,
                      left: maxItemWidth ? '50%' : 0,
                    }}
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

import React, {
  ReactNode,
  CSSProperties,
  FC,
  useRef,
  useState,
  Ref,
} from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SortableFixedSizeList, ChildrenProps } from 'react-window-sortable'
import { Space } from '~/types'
import { spaceToPx } from '~/utils'
import { styled } from 'inlines'
import { DragDropIcon, MoreIcon, DuplicateIcon, DeleteIcon } from '~/icons'
import { ListItem } from './ListItem'
import { useContextMenu } from '~/hooks'
import { ContextItem } from '~'

type CustomListProps = {
  items?: any[]
  draggable?: boolean
  expandable?: boolean
  children?: ReactNode
  itemSize?: number
  itemSpace?: Space
  style?: CSSProperties
}

export const CustomList: FC<CustomListProps> = ({
  items,
  draggable,
  expandable,
  children,
  itemSpace = 0,
  itemSize = 56 + +itemSpace,
  style,
}) => {
  const [data, setData] = useState(items)
  const [draggy, setDraggy] = useState(false)

  const listRef = useRef<any>()

  const move = (arr: any[], from: number, to: number) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  const DragDropper = styled(DragDropIcon, {
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

  const sillyDiv = document.createElement('div')
  sillyDiv.setAttribute('id', 'sillyDivId')
  sillyDiv.innerHTML = 'hallo'
  sillyDiv.style.width = '100px'
  sillyDiv.style.height = '60px'
  sillyDiv.style.background = 'red'
  sillyDiv.style.zIndex = '9999'

  const addDivToCursor = (e) => {
    console.log(e.target)

    document.addEventListener('mousedown', function () {
      document.addEventListener('mousemove', movingmouse)

      document.body.appendChild(sillyDiv)

      function movingmouse(e) {
        sillyDiv.style.position = 'absolute'
        sillyDiv.style.left = `${e.clientX}px`
        sillyDiv.style.top = `${e.clientY}px`
      }

      document.addEventListener('mouseup', function () {
        document.getElementById('sillyDivId').remove()
        //    document.body.removeChild(sillyDiv)
        document.removeEventListener('mousemove', movingmouse)
      })
    })
  }

  console.log(data)
  console.log(style)

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
                          // append a copy to the mouse cursor
                          addDivToCursor(e)
                        }}
                        style={{ marginLeft: 16, marginRight: 16 }}
                      />
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

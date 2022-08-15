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
import { DragDropIcon } from '~/icons'
import { ListItem } from './ListItem'

type CustomListProps = {
  title?: string
  items?: any[]
  draggable?: boolean
  expandable?: boolean
  children?: ReactNode
  itemSize?: number
  itemSpace?: Space
  style?: CSSProperties
}

export const CustomList: FC<CustomListProps> = ({
  title,
  items,
  draggable,
  expandable,
  children,
  itemSpace = 12,
  itemSize = 56 + +itemSpace,
  style,
}) => {
  const [data, setData] = useState(items)

  const listRef = useRef<any>()

  const move = (arr: any[], from: number, to: number) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
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
                  <ListItem style={style} itemSize={itemSize} space={itemSpace}>
                    {draggable && (
                      <DragDropIcon
                        onMouseDown={onSortMouseDown}
                        style={{ marginLeft: 16, marginRight: 16 }}
                      />
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

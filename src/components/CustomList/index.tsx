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

type CustomListProps = {
  title?: string
  items?: any[]
  draggable?: boolean
  expandable?: boolean
  children?: ReactNode
  width?: number
  height?: number
  style?: CSSProperties
}

export const CustomList: FC<CustomListProps> = ({
  title,
  items,
  draggable,
  expandable,
  children,
  width,
  height = 300,
  style,
}) => {
  const [data, setData] = useState(items)

  const listRef = useRef<any>()

  const move = (arr: any[], from: number, to: number) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  console.log(items)

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <SortableFixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={40}
            itemData={data}
            onSortOrderChanged={({ originalIndex, newIndex }) => {
              move(data, originalIndex, newIndex)
              setData(data.slice(0))
            }}
          >
            {React.forwardRef(
              (
                { data, index, style, onSortMouseDown }: ChildrenProps,
                ref: Ref<any>
              ) => (
                <div ref={ref} style={style}>
                  <button onMouseDown={onSortMouseDown}>drag handle</button>
                  {data[index]}
                </div>
              )
            )}
          </SortableFixedSizeList>
        )
      }}
    </AutoSizer>
  )
}

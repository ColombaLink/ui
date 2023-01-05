import React, { forwardRef } from 'react'

import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '~/hooks'
import useDragScroll from '~/hooks/useDragScroll'
import { ListItem } from './ListItem'

const PADDING_SIZE = 10

// const innerElementType = forwardRef(({ style, ...rest }, ref) => (
//   <div
//     ref={ref}
//     style={{
//       background: 'yellow',
//       height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`,
//     }}
//     {...rest}
//   />
// ))

export const CustomList = (props) => {
  let { items = [] } = props
  console.log('items', items)
  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = props
        return (
          <SelectableCollection items={items}>
            <FixedSizeList
              width={width}
              height={height}
              //   innerElementType={innerElementType}
              itemCount={items.length}
              itemSize={40}
              style={{ padding: 10 }}
              itemData={{ context, ...props }}
              {...useDragScroll(true)}
            >
              {ListItem}
            </FixedSizeList>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}

const testItem = ({ index, style }) => {
  return (
    <div
      style={{
        ...style,
        top: `${parseFloat(style.top) + PADDING_SIZE}px`,
        backgroundColor: index % 2 === 0 ? 'lightblue' : '#f6f6f6',
      }}
    >
      test {index}
    </div>
  )
}

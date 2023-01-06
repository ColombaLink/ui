import React, { forwardRef } from 'react'

import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '~/hooks'
import useDragScroll from '~/hooks/useDragScroll'
import { ListItem } from './ListItem'

export const CustomList = (props) => {
  let { items = [], activeId } = props
  console.log('items --> from inside the list', items)
  console.log('activeId --> from inside the list', activeId)

  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = props
        return (
          <SelectableCollection items={items}>
            <FixedSizeList
              width={width}
              height={height}
              innerElementType={getElementType(0, 0)}
              itemCount={items.length}
              itemSize={40}
              style={{ background: 'yellow' }}
              itemData={{ items, context, ...props }}
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

const mem = {}

const getElementType = (paddingTop: number, paddingBottom: number) => {
  const padding = paddingTop + paddingBottom
  if (!(padding in mem)) {
    mem[padding] = forwardRef<any>(({ style, ...rest }: any, ref) => {
      return (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${parseFloat(style.height) + padding}px`,
          }}
          {...rest}
        />
      )
    })
  }
  return mem[padding]
}

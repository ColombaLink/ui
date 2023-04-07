import React, { FC } from 'react'
import { VariableSizeGrid } from 'react-window'
import { Cell } from './Cell'

type GridProps = {
  data: RowData[]
  rowCount: number
  rowHeight: number
  width?: number
  height?: number
  columnCount?: number
  columnWidth: number
}

export const Grid: FC<GridProps> = ({
  data,
  rowCount,
  rowHeight,
  width,
  height,
  columnCount,
  columnWidth,
}) => {
  console.log('DATA from grid', data)

  return (
    <VariableSizeGrid
      columnCount={columnCount}
      columnWidth={(index) => columnWidth[index]}
      rowCount={rowCount}
      rowHeight={() => rowHeight}
      width={width}
      height={height}
      itemData={data}
      //   onItemsRendered={}
    >
      {Cell}
    </VariableSizeGrid>
  )
}

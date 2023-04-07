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
  columnWidthsArr: number[]
}

export const Grid: FC<GridProps> = ({
  data,
  rowCount,
  rowHeight,
  width,
  height,
  columnCount,
  columnWidthsArr,
}) => {
  console.log('DATA from grid', data)

  return (
    <VariableSizeGrid
      columnCount={columnCount}
      columnWidth={(index) => columnWidthsArr[index]}
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

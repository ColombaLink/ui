import React, { FC, useEffect, useRef } from 'react'
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
  setSelectedRows?: (e) => void
  selectedRows?: number[]
  //  onClick?: (data: EventData, e) => void
}

export const Grid: FC<GridProps> = ({
  data,
  rowCount,
  rowHeight,
  width,
  height,
  columnCount,
  columnWidthsArr,
  setSelectedRows,
  selectedRows,
  // onClick,
}) => {
  const varGridRef = useRef<any>()

  useEffect(() => {
    if (varGridRef.current) {
      varGridRef.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true,
      })
    }
  }, [columnWidthsArr])

  return (
    <VariableSizeGrid
      ref={varGridRef}
      columnCount={columnCount}
      columnWidth={(index) => columnWidthsArr[index]}
      rowCount={rowCount}
      rowHeight={() => rowHeight}
      width={width}
      height={height}
      itemData={{ data, setSelectedRows, selectedRows }}
      //  itemData={{ data, onClick }}
      //   onItemsRendered={}
    >
      {Cell}
    </VariableSizeGrid>
  )
}

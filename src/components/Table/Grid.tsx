import React, { FC, useEffect, useRef, useState } from 'react'
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
  onClick?: (e: EventData, data) => void
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
  onClick,
}) => {
  const varGridRef = useRef<any>()
  const [rowCountState, setRowCountState] = useState(rowCount)

  useEffect(() => {
    if (varGridRef.current) {
      varGridRef.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true,
      })
    }
  }, [columnWidthsArr])

  useEffect(() => {
    console.log('Rowcount', rowCount, 'RowCountState', rowCountState)
    if (rowCount < rowCountState) {
      varGridRef.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true,
      })
    }
  }, [rowCount])

  return (
    <VariableSizeGrid
      ref={varGridRef}
      columnCount={columnCount}
      columnWidth={(index) => columnWidthsArr[index]}
      rowCount={rowCount}
      rowHeight={() => rowHeight}
      width={width}
      height={height}
      itemData={{ data, setSelectedRows, selectedRows, onClick }}
      //   onItemsRendered={}
    >
      {Cell}
    </VariableSizeGrid>
  )
}

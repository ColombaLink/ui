import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react'
import { VariableSizeGrid } from 'react-window'
import { Cell } from './Cell'
import { TableHeader } from './types'

type TableGridProps = {
  data: {}[]
  rowCount: number
  rowHeight: number
  width?: number
  height?: number
  columnCount?: number
  columnWidthsArr: number[]
  setSelectedRows?: (e) => void
  selectedRows?: number[]
  onClick?: (e: MouseEvent, data) => void
  headers?: TableHeader<any>[]
}

export const Grid: FC<TableGridProps> = ({
  headers,
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
  const [rowCountState] = useState(rowCount)

  useEffect(() => {
    if (varGridRef.current) {
      varGridRef.current.resetAfterIndices({
        columnIndex: 0,
        rowIndex: 0,
        shouldForceUpdate: true,
      })
    }
  }, [columnWidthsArr, headers])

  useEffect(() => {
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
      itemData={{ data, setSelectedRows, selectedRows, onClick, headers }}
      //   onItemsRendered={}
    >
      {Cell}
    </VariableSizeGrid>
  )
}

import React, { ReactNode, FC, useState, useEffect } from 'react'
import { styled, Style } from '~'
import { Grid } from './Grid'
import { TableHeader } from './TableHeader'

type TableProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
  //  data: RowData[] // available data
  data: any
  width: number
  height: number
  rowCount?: number // total rows
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  onVisibleRowIndex?: (indexes: {
    startIndex: number
    endIndex: number
  }) => void
  // onClick?: (data: EventData, e) => void
}

export const Table: FC<TableProps> = ({
  headers,
  data,
  rowCount = data.length,
  rowHeight = 56,
  width,
  height,
  columnCount = headers.length,
  columnWidth = 124,
  // onClick,
}) => {
  // columnwidths should be array with each column width
  const [columnWidthsArr, setColumnWidthsArr] = useState(
    new Array(columnCount).fill(true).map(() => columnWidth)
  )

  const [shownHeaderKeys, setShownHeaderKeys] = useState([])

  useEffect(() => {
    setShownHeaderKeys(headers.map((item) => item.key))
  }, [])

  console.log(shownHeaderKeys)

  return (
    <>
      <TableHeader
        headers={headers}
        columnWidthsArr={columnWidthsArr}
        setColumnWidthsArr={setColumnWidthsArr}
      />
      <Grid
        data={data}
        rowCount={rowCount}
        rowHeight={rowHeight}
        columnCount={columnCount}
        columnWidthsArr={columnWidthsArr}
        width={width}
        height={height}
        //     onClick={onClick}
      />
    </>
  )
}

/*
const App = () => {
 
  return <Table 

    onVisibleRowIndex={({ startIndex, endIndex }) => {
        if (endIndex > data.length + 1) {
            setData([...data, {
                name: 'Random new thing' + data.length,
                body: 'Cool body',
                createdAt: Date.now()
            }])
        }
    }}
    onClick={({ item, key, colIndex, rowIndex }, e) => {
        
    }}
    />
}
*/

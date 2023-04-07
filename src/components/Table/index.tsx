import React, { ReactNode, FC, useState } from 'react'
import { Grid } from './Grid'
import { TableHeader } from './TableHeader'

type TableProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
  //  data: RowData[] // available data
  data: any
  rowCount?: number // total rows
  rowHeight?: number
  width?: number
  height?: number
  columnCount?: number
  onVisibleRowIndex?: (indexes: {
    startIndex: number
    endIndex: number
  }) => void
  onClick?: (data: EventData, e) => void
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
}) => {
  // columnwidths should be array with each column width
  const [columnWidthsArr, setColumnWidthsArr] = useState()

  // default columnwidth 124,
  const columnWidths = new Array(columnCount).fill(true).map(() => 124)

  return (
    <div>
      <TableHeader headers={headers} />
      <Grid
        data={data}
        rowCount={rowCount}
        rowHeight={rowHeight}
        columnCount={columnCount}
        columnWidth={columnWidths}
        width={width}
        height={height}
      />
    </div>
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

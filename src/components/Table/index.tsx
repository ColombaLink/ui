import React, { ReactNode, FC, useState, useEffect } from 'react'
import { Grid } from './Grid'
import { TableHeader } from './TableHeader'

type TableProps = {
  headers?: {
    key: string
    label: string | ReactNode
    showColumnCheckbox?: boolean
  }[]
  //  TODO data: RowData[] // available data
  data: any
  width?: number
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
  rowCount = data?.length,
  rowHeight = 56,
  width,
  height = 400,
  columnCount = headers?.length || Object.keys(data[0]).length,
  columnWidth = 132,
  // onClick,
}) => {
  const [tableHeaders, setTableHeaders] = useState(headers)
  const [tableData, setTableData] = useState(data || [])
  // columns Widths arr
  const [columnWidthsArr, setColumnWidthsArr] = useState(
    new Array(columnCount).fill(true).map(() => columnWidth)
  )

  useEffect(() => {
    if (headers) {
      setTableHeaders(
        tableHeaders.map((v) => ({ ...v, showColumnCheckbox: true }))
      )
    }
  }, [])

  useEffect(() => {
    const headerOrderArr = tableHeaders.map((x) =>
      x.showColumnCheckbox ? x.key : null
    )
    const newObjectOrder = {}

    for (const key of headerOrderArr) {
      newObjectOrder[key] = null
    }

    const newData = filterObjsInArr(data, Object.keys(newObjectOrder)).map(
      (obj) => Object.assign(newObjectOrder, obj)
    )

    newData.filter((obj) =>
      Object.keys(obj).forEach((key) => {
        if (obj[key] == null) {
          delete obj[key]
        }
      })
    )

    setTableData(newData)
  }, [tableHeaders])

  // for in loop from codewithlinda
  const filterObjsInArr = (arr, selection) => {
    const filteredArray = []
    arr.map((obj) => {
      const filteredObj = {}
      // use let
      for (let key in obj) {
        if (selection.includes(key)) {
          filteredObj[key] = obj[key]
        }
      }
      filteredArray.push(filteredObj)
    })
    return filteredArray
  }

  return (
    <>
      {tableHeaders && (
        <TableHeader
          headers={tableHeaders}
          setTableHeaders={setTableHeaders}
          columnWidthsArr={columnWidthsArr}
          setColumnWidthsArr={setColumnWidthsArr}
        />
      )}
      <Grid
        data={tableData}
        rowCount={rowCount}
        rowHeight={rowHeight}
        columnCount={columnCount}
        columnWidthsArr={columnWidthsArr}
        width={width || columnCount * columnWidth}
        height={height}
        //     onClick={onClick}
      />
    </>
  )
}

/*
<Table 

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
*/

import React, { ReactNode, FC, useState, useEffect } from 'react'
import { styled, Style } from '~'
import { Grid } from './Grid'
import { TableHeader } from './TableHeader'
import useLocalStorage from '@based/use-local-storage'

type TableProps = {
  headers?: {
    key: string
    label: string | ReactNode
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
  console.log('DATA??', data)

  const [tableHeaders, setTableHeaders] = useState(headers)
  const [tableData, setTableData] = useState(data || [])
  // columns Widths arr
  const [columnWidthsArr, setColumnWidthsArr] = useState(
    new Array(columnCount).fill(true).map(() => columnWidth)
  )

  console.log(
    'table headers🚘--> order array',
    tableHeaders.map((x) => x.key)
  )
  console.log('table data', tableData)

  useEffect(() => {
    const headerOrderArr = tableHeaders.map((x) => x.key)

    const newObjectOrder = {}

    for (const key of headerOrderArr) {
      newObjectOrder[key] = null
    }

    console.log(newObjectOrder)
    console.log(
      '☎️',
      tableData.map((obj) => Object.assign(newObjectOrder, obj))
    )

    // re order object based on tableheaders order
    setTableData(tableData.map((obj) => Object.assign(newObjectOrder, obj)))

    console.log('table data now ', tableData)
  }, [tableHeaders])

  // const [visibleColumns, setVisibleColumns] = useLocalStorage('visibleColumns')

  // useEffect(() => {
  //   if (headers) {
  //     setTableHeaders(
  //       tableHeaders.map((v) => ({ ...v, showColumnCheckbox: true }))
  //     )
  //   }
  // }, [])

  // useEffect(() => {
  //   if (tableHeaders) {
  //     // pak eerst de velden met checkbox true
  //     const visibleColumnKeys = visibleColumns
  //       ?.filter((item) => item.showColumnCheckbox)
  //       .map((item) => item.key)

  //     const newObj = filterObjsInArr(data, visibleColumnKeys)
  //     setTableData([...newObj])
  //   }
  // }, [visibleColumns])

  // for in loop from codewithlinda
  const filterObjsInArr = (arr, selection) => {
    const filteredArray = []
    arr.map((obj) => {
      const filteredObj = {}
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
          // visibleColumns={visibleColumns}
          // setVisibleColumns={setVisibleColumns}
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

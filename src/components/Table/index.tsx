import React, { ReactNode, FC, useState, useEffect } from 'react'
import { Grid } from './Grid'
import { TableHeader } from './TableHeader'
import { TableSelectionActions } from './TableSelectionActions'

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
  const [columnWidthsArr, setColumnWidthsArr] = useState(
    new Array(columnCount).fill(true).map(() => columnWidth)
  )
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllRows, setSelectAllRows] = useState(false)

  useEffect(() => {
    if (headers) {
      setTableHeaders(
        tableHeaders.map((v) => ({ ...v, showColumnCheckbox: true }))
      )
    }
  }, [])

  useEffect(() => {
    if (selectAllRows) {
      setSelectedRows([...Array(data.length).keys()])
    } else {
      setSelectedRows([])
    }
    console.log('FIRE 🔥')
  }, [selectAllRows])

  useEffect(() => {
    if (selectedRows.length !== tableData.length) {
      setSelectAllRows(false)
    }
  }, [selectedRows])

  useEffect(() => {
    if (headers) {
      const headerOrderArr = tableHeaders.map((x) =>
        x.showColumnCheckbox ? x.key : null
      )
      const newObjectOrder = {}

      for (const key of headerOrderArr) {
        newObjectOrder[key] = null
      }

      const newData = filterObjsInArr(data, Object.keys(newObjectOrder))
      const newerData = newData.map((obj) =>
        preferredOrder(obj, Object.keys(newObjectOrder))
      )

      setTableData(newerData)
    }
  }, [tableHeaders])

  // for in loop from codewithlinda
  const filterObjsInArr = (arr, selection) => {
    const filteredArray = []
    arr.forEach((obj) => {
      const filteredObj = {}
      // use let
      for (const key in obj) {
        if (selection.includes(key)) {
          filteredObj[key] = obj[key]
        }
      }
      filteredArray.push(filteredObj)
    })
    return filteredArray
  }

  const preferredOrder = (obj, order) => {
    const newObject = {}
    for (let i = 0; i < order.length; i++) {
      if (Object.prototype.hasOwnProperty.call(obj, order[i])) {
        newObject[order[i]] = obj[order[i]]
      }
    }
    return newObject
  }

  return (
    <>
      {selectedRows.length >= 0 && (
        <TableSelectionActions
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
      {tableHeaders && (
        <TableHeader
          headers={tableHeaders}
          setTableHeaders={setTableHeaders}
          columnWidthsArr={columnWidthsArr}
          setColumnWidthsArr={setColumnWidthsArr}
          setSelectAllRows={setSelectAllRows}
          selectAllRows={selectAllRows}
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
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
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

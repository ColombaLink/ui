import React, { ReactNode, FC, useState, useEffect } from 'react'
import { Grid } from './Grid'
import { styled, Style } from 'inlines'
import { TableHeader } from './TableHeader'
import { TableSelectionActions } from './TableSelectionActions'
import AutoSizer from 'react-virtualized-auto-sizer'

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
  const [showSelectedRows, setShowSelectedRows] = useState()

  useEffect(() => {
    if (headers) {
      setTableHeaders(
        tableHeaders.map((v) => ({ ...v, showColumnCheckbox: true }))
      )
    }
  }, [])

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

  // TODO RowCount

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

  const returnRowItemsThatWereSelected = (data, selectedRows) => {
    const newData = data.filter((item, idx) => selectedRows.includes(idx))
    console.log('🎃', newData)
    return newData
  }

  useEffect(() => {
    if (showSelectedRows) {
      setTableData(returnRowItemsThatWereSelected(tableData, selectedRows))
      setSelectedRows([])
    } else {
      setTableData(data)
      setTableHeaders(
        tableHeaders.map((v) => ({ ...v, showColumnCheckbox: true }))
      )
    }
  }, [showSelectedRows])

  return (
    <>
      {showSelectedRows || selectedRows.length > 0 ? (
        <TableSelectionActions
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setShowSelectedRows={setShowSelectedRows}
          showSelectedRows={showSelectedRows}
        />
      ) : null}
      {tableHeaders && (
        <TableHeader
          headers={tableHeaders}
          setTableHeaders={setTableHeaders}
          columnWidthsArr={columnWidthsArr}
          setColumnWidthsArr={setColumnWidthsArr}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          tableData={tableData}
        />
      )}

      <styled.div style={{ minHeight: height, maxWidth: width }}>
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              data={tableData}
              rowCount={tableData.length}
              rowHeight={rowHeight}
              columnCount={columnCount}
              columnWidthsArr={columnWidthsArr}
              width={width || columnCount * columnWidth}
              height={height}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              //     onClick={onClick}
            />
          )}
        </AutoSizer>
      </styled.div>
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

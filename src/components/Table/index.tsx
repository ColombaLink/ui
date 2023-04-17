import React, { ReactNode, FC, useState, useEffect, ReactElement } from 'react'
import { Grid } from './Grid'
import { styled } from 'inlines'
import { TableHeader } from './TableHeader'
import { TableSelectionActions } from './TableSelectionActions'
import AutoSizer from 'react-virtualized-auto-sizer'
import { usePropState } from '~/hooks'

// type Action = 'delete'
// type OnAction = (items: string[], action: Action) => void

type TableProps = {
  headers?: {
    key: string
    label: ReactNode
    showColumnCheckbox?: boolean
    render?: ReactElement // add correct props to fc
    renderProps?: {}
  }[]
  data?: {}[] // TYPE THIS
  width?: number
  height?: number
  rowCount?: number
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  // TODO these + onClick beter
  // onAction?: OnAction
  // onVisibleRowIndex?: (indexes: {
  //   startIndex: number
  //   endIndex: number
  // }) => void
  onClick?: (e: EventData, data) => void
}

export const Table: FC<TableProps> = ({
  headers,
  data,
  rowCount,
  rowHeight = 56,
  width,
  height = 400,
  columnCount = headers?.length ??
    (data && data.length && Object.keys(data[0]).length),
  columnWidth = 132,
  onClick,
  // onAction,
}) => {
  const [tableHeaders, setTableHeaders] = useState(headers)
  const [tableData, setTableData] = useState(data || [])
  const [columnWidthsArr, setColumnWidthsArr] = useState(
    new Array(columnCount).fill(true).map(() => columnWidth)
  )
  const [selectedRows, setSelectedRows] = useState([])
  const [showSelectedRows, setShowSelectedRows] = useState()

  // to keep track of selected rows
  const [selectedRowsCopy, setSelectedRowsCopy] = useState()

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

      //  console.log('new object ordr', newObjectOrder)
      const newData = showSelectedRows
        ? filterObjsInArr(selectedRowsCopy, Object.keys(newObjectOrder))
        : filterObjsInArr(data, Object.keys(newObjectOrder))

      ///  console.log('new DAta??', newData)
      const newerData = newData.map((obj) =>
        preferredOrder(obj, Object.keys(newObjectOrder))
      )

      setTableData(newerData)
    }
  }, [tableHeaders])

  // types
  const filterObjsInArr = (arr, selection) => {
    const filteredArray = []
    arr?.forEach((obj) => {
      const filteredObj = {}
      for (const key in obj) {
        if (selection.includes(key)) {
          filteredObj[key] = obj[key]
        }
      }
      filteredArray.push(filteredObj)
    })
    return filteredArray
  }

  // types
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
    return newData
  }

  useEffect(() => {
    if (showSelectedRows) {
      setTableData(returnRowItemsThatWereSelected(tableData, selectedRows))
      // make copy of current selected rows
      setSelectedRowsCopy(
        returnRowItemsThatWereSelected(tableData, selectedRows)
      )
      setSelectedRows([])
    } else {
      setTableData(tableData)
      setTableHeaders(
        tableHeaders?.map((v) => ({ ...v, showColumnCheckbox: true }))
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
              headers={tableHeaders}
              data={tableData}
              rowCount={rowCount || tableData.length}
              rowHeight={rowHeight}
              columnCount={columnCount}
              columnWidthsArr={columnWidthsArr}
              width={width || columnCount * columnWidth}
              height={height}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              onClick={onClick}
            />
          )}
        </AutoSizer>
      </styled.div>
    </>
  )
}

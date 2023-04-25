import React, { createElement } from 'react'
import { styled, Text, color, Checkbox } from '~'

const TableCheckBox = ({ data, rowIndex }) => {
  return (
    <Checkbox
      small
      style={{ marginRight: 6 }}
      checked={data.selectedRows.includes(rowIndex)}
      onChange={(e) => {
        if (e) {
          data.setSelectedRows([...data.selectedRows, rowIndex])
        } else {
          const arrCopy = [...data.selectedRows]
          const ix = arrCopy.indexOf(rowIndex)
          arrCopy.splice(ix, 1)
          data.setSelectedRows([...arrCopy])
        }
      }}
    />
  )
}

// TYPE FC
export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  let body = null

  const header = data.headers ? data.headers[columnIndex] : null
  const rowData = data.data[rowIndex]
  const rowDataKeys = Object.keys(data.data[rowIndex])

  // console.log('Row index', rowIndex)

  // filter to again

  const newHeaderData = data.headers.filter((item) =>
    rowDataKeys.includes(item.key)
  )

  // console.log(newHeaderData, '⛈ 🥞')

  body = newHeaderData[columnIndex]?.customComponent ? (
    createElement(newHeaderData[columnIndex].customComponent, {
      key: header.key,
      rowIndex,
      columnIndex,
      data: rowData[rowDataKeys[columnIndex]],
    })
  ) : (
    <Text>{rowData[rowDataKeys[columnIndex]]}</Text>
  )

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,
        paddingLeft: 6,
        ...style,
      }}
      onClick={data?.onClick}
    >
      {columnIndex === 0 ? (
        <TableCheckBox data={data} rowIndex={rowIndex} />
      ) : null}
      {body}
    </styled.div>
  )
}

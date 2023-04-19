import React, { createElement, useCallback } from 'react'
import { styled, Text, color, Checkbox } from '~'

const TableCheckBox = ({ data, rowIndex }) => {
  return (
    <Checkbox
      small
      style={{ marginRight: 6 }}
      checked={data.selectedRows.includes(rowIndex)}
      onChange={useCallback(
        (e) => {
          if (e) {
            data.setSelectedRows([...data.selectedRows, rowIndex])
          } else {
            const arrCopy = [...data.selectedRows]
            const ix = arrCopy.indexOf(rowIndex)
            arrCopy.splice(ix, 1)
            data.setSelectedRows([...arrCopy])
          }
        },
        [rowIndex]
      )}
    />
  )
}

// TYPE FC
export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  let body = null

  const header = data.headers ? data.headers[columnIndex] : null
  const rowData = data.data[rowIndex]

  const rowDataKeys = Object.keys(data.data[rowIndex])
  const headerKeys = data.headers
    ? data.headers
        .filter((item) => item.showColumnCheckbox)
        .map((item) => item.key)
    : null

  console.log(rowData)
  console.log(data.headers)
  console.log('Row keys', rowDataKeys)
  console.log('Headerkeys', headerKeys)

  body = header?.customComponent
    ? createElement(header.customComponent, {
        key: header.key,
        rowIndex,
        columnIndex,
        data: rowData[headerKeys[columnIndex]],
      })
    : null

  if (body === null) {
    body = <Text>{rowData[rowDataKeys[columnIndex]]}</Text>
  }

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

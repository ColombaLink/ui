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
          console.log(data.selectedRows)
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

  const header = data.headers[columnIndex]
  const rowData = data.data[rowIndex]

  console.log(header.key, '-------🍐')
  console.log(rowData)

  body = header.customComponent
    ? createElement(header.customComponent, {
        key: header.key,
        rowIndex,
        columnIndex,
        data: rowData,
      })
    : null

  if (body === null) {
    body = <Text>{rowData[header.key]}</Text>
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

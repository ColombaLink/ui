import React from 'react'
import { styled, Style, Text, color, Checkbox } from '~'

// this data here is only the itemdata..
export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  // get the object keys from data
  // only from the first they should all have the same keys...

  const ObjectKeys = Object.keys(data.data[0])

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,
        paddingLeft: 6,
        ...style,
      }}
      onClick={(e) => data.onClick(e, data.data[rowIndex])}
    >
      {columnIndex === 0 && (
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
      )}
      <Text>
        {data.data[rowIndex]
          ? data.data[rowIndex][ObjectKeys[columnIndex]]
          : null}
      </Text>
    </styled.div>
  )
}

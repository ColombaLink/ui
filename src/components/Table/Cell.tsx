import React from 'react'
import { styled, Style, Text, color, Checkbox } from '~'

// this data here is only the itemdata..
export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  // get the object keys from data
  // only from the first they should all have the same keys...
  const ObjectKeys = Object.keys(data[0])

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,
        paddingLeft: 6,
        ...style,
      }}
      // onClick={(e) => data.onClick(e)}
    >
      {columnIndex === 0 && <Checkbox small style={{ marginRight: 6 }} />}
      <Text>
        {data[rowIndex] ? data[rowIndex][ObjectKeys[columnIndex]] : null}
      </Text>
    </styled.div>
  )
}

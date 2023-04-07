import React from 'react'
import { styled, Style, Text } from '~'

export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  // get the object keys from data
  // only from the first they should all have the same keys...
  const ObjectKeys = Object.keys(data[0])

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(28, 45, 65, 0.1)',
        borderRight: '1px solid rgba(255, 25, 65, 0.2)',
        ...style,
      }}
    >
      <Text>
        {data[rowIndex] ? data[rowIndex][ObjectKeys[columnIndex]] : null}
      </Text>
    </styled.div>
  )
}

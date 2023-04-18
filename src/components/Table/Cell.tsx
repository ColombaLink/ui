import React from 'react'
import { styled, Text, color, Checkbox, Badge } from '~'
import { renderOrCreateElement } from '~/utils'

export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const ObjectKeys = Object.keys(data.data[0])

  console.log(ObjectKeys)

  // if header key is not in object keys remove it
  const headerData = data.headers.filter((item) =>
    ObjectKeys.includes(item.key)
  )

  // todo: check if columnindex and key are same so it doesnt go out of sync
  console.log('🌝', data.data)
  console.log('new header data', headerData)

  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,
        paddingLeft: 6,
        ...style,
      }}
      // onClick={(e) => data.onClick(e, data.data[rowIndex])}
      onClick={() => data?.onClick()}
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

      {headerData[columnIndex]?.render ? (
        renderOrCreateElement(headerData[columnIndex]?.render, {
          children: data.data[rowIndex][ObjectKeys[columnIndex]],
        })
      ) : (
        <Text>
          {data.data[rowIndex]
            ? data.data[rowIndex][ObjectKeys[columnIndex]]
            : null}
        </Text>
      )}
    </styled.div>
  )
}

import React from 'react'
import { styled, Text, color, Checkbox } from '~'
import { renderOrCreateElement } from '~/utils'

export const Cell = ({ columnIndex, rowIndex, style, data }) => {
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

      {data.headers?.[columnIndex]?.render &&
      data.headers?.[columnIndex]?.showColumnCheckbox ? (
        renderOrCreateElement(data.headers?.[columnIndex]?.render, {
          children: data.data[rowIndex][ObjectKeys[columnIndex]],
          ...data.headers?.[columnIndex]?.renderProps,
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

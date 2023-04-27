import React, { FC, createElement } from 'react'
import { styled, border, Text } from '~'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps } from './types'

import { VariableSizeGrid as Grid } from 'react-window'

const Cell = (props) => {
  const { columnIndex, rowIndex, style, data } = props

  if (rowIndex === 0) {
    console.info(rowIndex, columnIndex, data, data[rowIndex])

    const cellData = data.data[rowIndex][columnIndex]
    return (
      <styled.div
        style={{
          padding: 16,
          borderBottom: border(1, 'border'),
          ...style,
        }}
      >
        <Text typo="body600">{cellData.label ?? cellData.key}</Text>
      </styled.div>
    )
  }

  const header = data.headers[columnIndex]
  const rowData = data.data[rowIndex]
  const itemData = rowData[header.key]

  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
    })
  ) : (
    <Text>{typeof itemData === 'object' ? 'isObj' : itemData} </Text>
  )

  return (
    <styled.div
      style={{
        padding: 16,
        borderBottom: border(1, 'border'),
        ...style,
      }}
    >
      {body}
    </styled.div>
  )
}

export const Table: FC<TableProps> = (props) => {
  const {
    headers,
    data = [],
    rowCount = data.length,
    rowHeight = 56,
    width,
    height = data.length < 20 ? data.length * 56 + 56 : 400,
    columnCount = headers?.length ??
      (data && data.length && Object.keys(data[0]).length),
  } = props

  const parsedData = [headers, ...data]

  return (
    <>
      <styled.div
        style={{
          minHeight: height,
          height: '100%',
          width: '100%',
          maxWidth: width,
        }}
      >
        <AutoSizer>
          {({ width, height }) => {
            // make this useMemo style
            // this needs to listen to on resize
            let w = 0
            let defW = 0
            let nonAllocated = 0
            for (const h of headers) {
              if (h.width) {
                w += h.width
              } else {
                nonAllocated++
              }
            }
            defW = Math.max(Math.floor((width - w - 16) / nonAllocated), 100)
            return (
              <>
                <Grid
                  columnCount={columnCount}
                  columnWidth={(colIndex) => {
                    return headers[colIndex].width ?? defW
                  }}
                  height={height}
                  rowCount={rowCount + 1}
                  rowHeight={() => rowHeight}
                  width={width}
                  itemData={{
                    ...props,
                    data: parsedData,
                  }}
                >
                  {Cell}
                </Grid>
              </>
            )
          }}
        </AutoSizer>
      </styled.div>
    </>
  )
}

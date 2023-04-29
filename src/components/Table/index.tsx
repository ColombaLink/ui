import React, {
  FC,
  createElement,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { styled, border, Text } from '~'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps, TableHeader, SortOptions } from './types'
import { useInfiniteQuery } from './useInfiniteQuery'

import { VariableSizeGrid as Grid } from 'react-window'

const Header: FC<{
  rowHeight: number
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  setSortOptions: Dispatch<SetStateAction<SortOptions>>
  sortOptions: SortOptions
}> = ({ headers, rowHeight, width, headerWidth }) => {
  const children: ReactNode[] = []
  let total = 16
  for (const header of headers) {
    const w = header.width ?? headerWidth
    children.push(
      <styled.div
        key={header.key}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          left: total,
          top: 0,
          height: rowHeight,
          width: w,
        }}
      >
        <Text typo="body600">{header.label ?? header.key}</Text>
      </styled.div>
    )
    total += w
  }
  return (
    <styled.div
      style={{
        width,
        borderBottom: border(1, 'border'),
        height: rowHeight,
        position: 'relative',
      }}
    >
      {children}
    </styled.div>
  )
}

const Cell = (props) => {
  const { columnIndex, rowIndex, style, data } = props
  const header = data.headers[columnIndex]
  const rowData = data.data[rowIndex]
  if (!rowData) {
    return null
  }
  const itemData = rowData[header.key]
  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
      columnIndex,
      rowIndex,
    })
  ) : (
    <Text selectable>{typeof itemData === 'object' ? 'isObj' : itemData} </Text>
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

const SizedGrid: FC<TableProps> = (props) => {
  const {
    query,
    getQueryItems,
    headers,
    data = [],
    defaultSortOptions,
    // rowCount = data.length,
    rowHeight = 56,
    width,
    queryId,
    itemCount = data.length,
    height = itemCount < 20 ? data.length * rowHeight + rowHeight : 400,
    columnCount = headers?.length ??
      (data && data.length && Object.keys(data[0]).length),
  } = props

  // TODO: this needs to listen to on window.resize
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

  const [sortOptions, setSortOpts] = useState<SortOptions>(
    defaultSortOptions ?? {
      $field: 'createdAt',
      $order: 'desc',
    }
  )

  const result = useInfiniteQuery({
    query,
    getQueryItems,
    rowHeight,
    queryId: queryId + sortOptions.$field + sortOptions.$order,
    sortOptions,
    itemCount,
    height: height - rowHeight,
  })

  const parsedData = query ? result.items : data

  defW = Math.max(Math.floor((width - w - 16) / nonAllocated), 100)
  return (
    <>
      <Header
        sortOptions={sortOptions}
        setSortOptions={setSortOpts}
        width={width}
        rowHeight={rowHeight}
        headers={headers}
        headerWidth={defW}
      />
      <Grid
        onScroll={(e) => {
          result.onScrollY(e.scrollTop)
        }}
        columnCount={columnCount}
        columnWidth={(colIndex) => {
          return headers[colIndex].width ?? defW
        }}
        height={height - rowHeight}
        rowCount={itemCount}
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
}

export const Table: FC<TableProps> = (props) => {
  const {
    data = [],
    width,
    itemCount = data.length,
    rowHeight = 56,
    height = itemCount < 20 ? data.length * rowHeight + rowHeight : 400,
  } = props
  return (
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
          return <SizedGrid {...props} height={height} width={width} />
        }}
      </AutoSizer>
    </styled.div>
  )
}

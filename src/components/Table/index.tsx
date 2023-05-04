import React, {
  FC,
  createElement,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useEffect,
} from 'react'
import { styled, border, Text, color } from '~'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps, TableHeader, SortOptions } from './types'
import { useInfiniteQuery } from './useInfiniteQuery'

export * from './types'

import { VariableSizeGrid as Grid } from 'react-window'

const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  setSortOptions: Dispatch<SetStateAction<SortOptions>>
  sortOptions: SortOptions
}> = ({ headers, width, headerWidth }) => {
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
          height: 56,
          width: w,
        }}
      >
        <Text typography="body600">{header.label ?? header.key}</Text>
      </styled.div>
    )
    total += w
  }
  return (
    <styled.div
      style={{
        width,
        borderBottom: border(1, 'border'),
        height: 56,
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

  const onClick = props.data.onClick
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
      onMouseEnter={
        onClick
          ? (e) => {
              e.currentTarget.parentNode.style.background = color(
                'accent',
                true
              )
            }
          : null
      }
      onMouseLeave={
        onClick
          ? (e) => {
              e.currentTarget.parentNode.style.background = null
            }
          : null
      }
      style={{
        padding: 16,
        borderBottom: border(1, 'border'),
        cursor: onClick ? 'pointer' : 'default',

        ...style,
      }}
      onClick={
        onClick
          ? (e) => {
              onClick(e, rowData)
            }
          : null
      }
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
    calcRowHeight,
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

  const rowH = useMemo(() => {
    if (calcRowHeight) {
      return (index: number) => calcRowHeight(data?.[index], index)
    }
    return () => rowHeight
  }, [calcRowHeight, rowHeight])

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

  defW = Math.max(Math.floor((width - w - 20) / nonAllocated), 100)
  return (
    <>
      <Header
        sortOptions={sortOptions}
        setSortOptions={setSortOpts}
        width={width}
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
        height={height - 56}
        rowCount={itemCount}
        rowHeight={rowH}
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

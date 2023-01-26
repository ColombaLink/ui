// @ts-nocheck
import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'

import { InfiniteListQueryResponse } from '../InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
import { HEADER_HEIGHT, ITEM_HEIGHT } from './constants'
import { TableFromQuery } from './TableFromQuery'
import { OnAction } from './types'

type Fields =
  | {
      [field: string]: string
    }
  | string[]

type TableProps = {
  fields?: Fields
  query?: (
    offset: number,
    limit: number,
    sortField: string,
    sortOrder: string
  ) => InfiniteListQueryResponse
  data?: object[]
  width?: number
  height?: number
  language?: string
  target?: string
  setTableIsEmpty?: (isEmpty: boolean) => void
  onAction?: OnAction
  onClick?: (
    item: { [key: string]: string },
    field: string,
    fieldType: string
  ) => void
}

const TableFromData = () => {
  return 'todo'
}

export const Table: FC<TableProps> = ({ style, ...props }) => {
  const [selectedRowCheckboxes, setSelectedRowCheckboxes] = useState([])

  // console.log(selectedRowCheckboxes)

  return (
    <styled.div
      style={{
        minHeight: HEADER_HEIGHT + ITEM_HEIGHT * 3,
        flexGrow: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        ...scrollAreaStyle,
        ...style,
      }}
    >
      <AutoSizer>
        {({ width, height }) => {
          return props.query ? (
            <TableFromQuery
              width={width}
              height={height}
              {...props}
              selectedRowCheckboxes={selectedRowCheckboxes}
              setSelectedRowCheckboxes={setSelectedRowCheckboxes}
            />
          ) : (
            <TableFromData width={width} height={height} {...props} />
          )
        }}
      </AutoSizer>
    </styled.div>
  )
}

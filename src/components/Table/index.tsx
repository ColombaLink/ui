// @ts-nocheck
import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Button, Text, AddIcon } from '~'
import { InfiniteListQueryResponse } from '../InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
import { HEADER_HEIGHT, ITEM_HEIGHT } from './constants'
import { TableFromQuery } from './TableFromQuery'
import { OnAction } from './types'
import { useLocation } from '~/hooks'

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
  onAction?: OnAction
  isMultiref?: boolean
  onClick?: (
    item: { [key: string]: string },
    field: string,
    fieldType: string
  ) => void
  prefix?: string
  view?: string
}

const TableFromData = () => {
  return 'todo'
}

export const Table: FC<TableProps> = ({ style, ...props }) => {
  const [selectedRowCheckboxes, setSelectedRowCheckboxes] = useState([])
  const [tableIsEmpty, setTableIsEmpty] = useState(true)

  const [, setLocation] = useLocation()

  // console.log(selectedRowCheckboxes)
  // console.log('Table ---> ', props)

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
      {tableIsEmpty && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', marginBottom: '20px', gap: 4 }}>
            <Text>Create a new item for </Text>
            <Text typo="body600"> {`${props.view}`}.</Text>
          </div>
          <Button
            large
            icon={AddIcon}
            onClick={() => {
              // console.log('lable', label, 'view', view, 'prefix', prefix)
              setLocation(`${props.prefix}/create/${props.view}`)
            }}
            //  onClick={useContextMenu(CreateMenu, { prefix, types })}
          >
            Create Item
          </Button>
        </div>
      )}

      <AutoSizer>
        {({ width, height }) => {
          return props.query ? (
            <TableFromQuery
              style={{ backgroundColor: 'red', minHeight: 200 }}
              width={width}
              height={height}
              {...props}
              selectedRowCheckboxes={selectedRowCheckboxes}
              setSelectedRowCheckboxes={setSelectedRowCheckboxes}
              setTableIsEmpty={setTableIsEmpty}
            />
          ) : (
            <TableFromData width={width} height={height} {...props} />
          )
        }}
      </AutoSizer>
    </styled.div>
  )
}

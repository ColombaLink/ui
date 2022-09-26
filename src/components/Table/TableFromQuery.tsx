import React, { FC, CSSProperties, useRef, useState } from 'react'
import { border, capitalize, color, parseDisplayName } from '~/utils'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import {
  AttachmentIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
} from '~/icons'
import { VariableSizeGrid } from 'react-window'
import { useInfiniteScroll } from '../InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Row } from './Row'
import { Cell } from './Cell'
import { isImage } from '~/utils/isImage'
import {
  ACTIONS_WIDTH,
  HEADER_HEIGHT,
  ITEM_HEIGHT,
  ITEM_WIDTH,
} from './constants'
import { useSchema } from '@based/react'
import { toDateString } from '~/utils/date'
import { Button } from '../Button'
import { Badge } from '../Badge'

const Grid = styled(VariableSizeGrid)
const References = ({ value: { length } }) => {
  return length ? (
    <>
      <AttachmentIcon
        color="accent"
        style={{
          marginRight: 4,
        }}
      />
      <Text color="accent">{length}</Text>
    </>
  ) : null
}

const Cell = ({
  columnIndex,
  rowIndex,
  style,
  data: { types, items, fields, onClick },
}) => {
  const item = items[rowIndex]
  let children, value, field

  if (item) {
    field = fields[columnIndex]
    value = item[field]

    if (value) {
      const fieldType = types[item.type].fields[field].type
      const weight = columnIndex ? 400 : 500
      // console.log({ field, fieldType })
      if (fieldType === 'array') {
        children = 'ARRAY!'
      } else if (fieldType === 'record') {
        children = 'RECORD!'
      } else if (fieldType === 'set') {
        children = 'SET!'
      } else if (fieldType === 'object') {
        children = 'OBJECT!'
      } else if (fieldType === 'id') {
        children = <Badge>{value}</Badge>
      } else if (fieldType === 'references') {
        children = <References value={value} />
      } else if (fieldType === 'timestamp') {
        children = <Text weight={weight}>{toDateString(value)}</Text>
      } else if (isImage(value)) {
        children = (
          <div
            style={{
              backgroundImage: `url(${value})`,
              backgroundSize: 'cover',
              height: style.height,
              width: style.height,
            }}
          />
        )
      } else {
        children = <Text weight={weight}>{value}</Text>
      }
    } else {
      children = '-'
    }
  }

  return (
    <div
      onClick={() => onClick(field, value, item)}
      style={{
        ...style,
        top: style.top + HEADER_HEIGHT,
        left: style.left + ACTIONS_WIDTH,
        width: style.width - 12,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )
}

export const TableFromQuery = ({
  query,
  fields,
  width,
  height,
  target = 'root',
  language = 'en',
  onClick,
}) => {
  const colWidth = 200
  const { schema } = useSchema()
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'createdAt',
    'desc',
  ])
  // const [colWidths, setColWidths] = useState([])
  const { itemCount, items, onScrollY, loading } = useInfiniteScroll({
    query: (offset, limit) => query(offset, limit, sortField, sortOrder),
    height,
    target,
    language,
    itemSize: ITEM_HEIGHT,
    // treshold: 15,
  })

  if (loading) {
    return null
  }

  const types = {
    root: schema.rootType,
    ...schema.types,
  }

  const columnCount = fields.length // one extra for actions
  const columnWidth = (index) => {
    const field = fields[index]
    if (field === 'id') {
      return 116
    }
    if (field === 'children' || field === 'parents') {
      return 96
    }
    return colWidth
  }

  return (
    <Grid
      style={scrollAreaStyle}
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      itemData={{
        types,
        items,
        fields,
        onClick,
      }}
      itemKey={({ columnIndex, data: { items, fields }, rowIndex }) =>
        `${items[rowIndex]?.id || rowIndex}-${fields[columnIndex]}`
      }
      innerElementType={({ children, style }) => {
        const rows = []
        const backgroundColor = color('background')
        children.forEach(({ props }, index) => {
          if (!(props.rowIndex in rows)) {
            const item = props.data.items[props.rowIndex]
            const id = item?.id
            rows[props.rowIndex] = (
              <div
                key={id || index}
                style={{
                  ...props.style,
                  left: 0,
                  top: props.style.top + HEADER_HEIGHT,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    marginLeft: 24,
                    borderRadius: 4,
                    backgroundColor,
                    boxShadow: `0 0 32px ${backgroundColor}`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox size={16} />
                  <Button ghost icon={EditIcon} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -1,
                    width: width,
                    borderBottom: border(1),
                  }}
                />
              </div>
            )
          }
        })

        const actionsOffset = 24

        return (
          <div
            style={{
              ...style,
              width: style.width + ACTIONS_WIDTH,
            }}
          >
            <div>{children}</div>
            <div
              style={{
                position: 'sticky',
                left: -actionsOffset,
                width: ACTIONS_WIDTH,
                height: 0,
              }}
            >
              {rows}
            </div>
            <div
              style={{
                position: 'sticky',
                left: 0,
                minWidth: width,
                top: 0,
                display: 'flex',
                borderBottom: border(1),
                backgroundColor: color('background'),
                height: HEADER_HEIGHT,
              }}
            >
              <div style={{ width: ACTIONS_WIDTH }} />
              {fields.map((field, index) => (
                <Text
                  key={field}
                  color="text2"
                  weight="400"
                  style={{
                    width: columnWidth(index),
                    height: HEADER_HEIGHT,
                    lineHeight: `${HEADER_HEIGHT}px`,
                  }}
                >
                  {capitalize(field)}
                </Text>
              ))}
            </div>
          </div>
        )
      }}
      rowCount={itemCount}
      estimatedColumnWidth={colWidth}
      estimatedRowHeight={ITEM_HEIGHT}
      rowHeight={() => ITEM_HEIGHT}
      width={width}
      onScroll={({ scrollTop }) => onScrollY(scrollTop)}
    >
      {Cell}
    </Grid>
  )
  /*
  const [init, setInit] = useState<boolean>()
  const { schema, loading } = useSchema()
  const { current: longest } = useRef({})
  const { current: textWidths } = useRef({})
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'createdAt',
    'desc',
  ])

  if (!fields) {
    return null
  }

  const ctx = useRef<CanvasRenderingContext2D>()

  const measure = (field, value) => {
    if (!isImage.test(value)) {
      if (isDate(value)) {
        value = toDateString(value)
      }
      const { width } = ctx.current.measureText(value)
      if (textWidths[field] >= width) return
      textWidths[field] = width
      longest[field] = value
    }
  }

  if (!ctx.current) {
    const c = document.createElement('canvas')
    ctx.current = c.getContext('2d')
    ctx.current.font = '500 15px Font'
  }

  return (
    <IList
      target={target}
      language={language}
      height={height - HEADER_HEIGHT}
      query={(offset, limit) => query(offset, limit, sortField, sortOrder)}
      itemSize={ITEM_HEIGHT}
      width={width}
      itemData={(items) => {
        if (init) {
          return { data: items, longest, fields, onClick }
        }
        for (const item of items) {
          if (item) {
            for (const field of fields) {
              if (field in item) {
                measure(field, item[field])
              }
            }
          }
        }
        setTimeout(() => setInit(true))
        return { data: items, longest, fields, onClick }
      }}
    >
      {Row}
    </IList>
  )
  */
}

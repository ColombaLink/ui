import React, { FC, CSSProperties, useRef, useState } from 'react'
import { border } from '~/utils'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import { ChevronDownIcon, ChevronUpIcon, EditIcon } from '~/icons'
import { VariableSizeGrid as Grid, FixedSizeList } from 'react-window'
import {
  InfiniteList,
  InfiniteListQueryResponse,
  useInfiniteScroll,
} from '../InfiniteList'
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
import { TableFromQuery } from './TableFromQuery'

const List = styled(FixedSizeList, scrollAreaStyle)
const IList = styled(InfiniteList, {
  ...scrollAreaStyle,
  overflowX: 'hidden',
  scrollbarGutter: 'none',
})

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
  itemSize?: number
  style?: CSSProperties
  width?: number
  height?: number
  language?: string
  target?: string
}

const toDateString = (ms) =>
  new Date(ms).toLocaleString('local', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const isDate = (n) => typeof n === 'number' && n > 9466812e5

const SortIcon = ({ order }) => {
  return (
    <Text
      color="text2"
      style={{
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translate3d(0,-50%,0)',
      }}
    >
      {order === 'asc' ? (
        <ChevronUpIcon size={12} strokeWidth={3} />
      ) : (
        <ChevronDownIcon size={12} strokeWidth={3} />
      )}
    </Text>
  )
}
// TODO handle nested fields
const TableInner: FC<TableProps> = ({
  fields: fieldsProp,
  query,
  data,
  width,
  height,
  target,
  language,
  onClick,
}) => {
  const [init, setInit] = useState<boolean>()
  const isObject = fieldsProp && !Array.isArray(fieldsProp)
  // @ts-ignore
  let [fields, setFields] = useState<string[]>(() =>
    isObject ? Object.keys(fieldsProp) : fieldsProp
  )
  const { current: longest } = useRef({})
  const { current: textWidths } = useRef({})
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'createdAt',
    'desc',
  ])
  const ctx = useRef<CanvasRenderingContext2D>()

  let labels

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

  if (data) {
    if (fields) {
      for (const item of data) {
        for (const field of fields) {
          if (field in item) {
            measure(field, item[field])
          }
        }
      }
    } else {
      const set = new Set()
      for (const item of data) {
        for (const key in item) {
          set.add(key)
          measure(key, item[key])
        }
      }
      fields = Array.from(set) as string[]
    }
  }

  if (fields) {
    labels = isObject
      ? Object.values(fieldsProp)
      : fields.map((header) =>
          header
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
        )
    fields.forEach((field, i) => {
      measure(field, labels[i])
    })
    const minWidth =
      ~~Object.keys(textWidths).reduce((size, key) => {
        return size + Math.max(ITEM_WIDTH, textWidths[key])
      }, 0) + ACTIONS_WIDTH

    // const minWidth = fields.length * ITEM_WIDTH + ACTIONS_WIDTH // TODO find out why we need this mystery 5px
    if (minWidth > width) {
      width = minWidth //
    }
  }

  return (
    <div style={{ width }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          borderBottom: border(1),
          height: HEADER_HEIGHT,
          alignItems: 'center',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ width: ACTIONS_WIDTH, flexShrink: 0 }}>
          <Checkbox
            style={{ marginLeft: 24 }}
            onChange={(checked) => {
              // for (const item of )
            }}
          />
        </div>
        {labels?.map((label, i) => {
          const field = fields[i]
          const selected = sortField === field
          return (
            <Cell
              key={label}
              color="text2"
              longestString={longest[fields[i]]}
              index={i}
              height={39}
              icon={selected ? <SortIcon order={sortOrder} /> : null}
              onClick={() => {
                if (selected) {
                  setSort([field, sortOrder === 'asc' ? 'desc' : 'asc'])
                } else {
                  setSort([field, 'asc'])
                }
              }}
            >
              {label}
            </Cell>
          )
        })}
      </div>
      {data ? (
        <List
          height={height - HEADER_HEIGHT}
          itemCount={data.length}
          itemSize={ITEM_HEIGHT}
          itemData={{ fields, data, longest }}
          width={width}
        >
          {Row}
        </List>
      ) : (
        <IList
          target={target}
          language={language}
          height={height - HEADER_HEIGHT}
          query={(offset, limit) => query(offset, limit, sortField, sortOrder)}
          itemData={(items) => {
            if (fields) {
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
            }

            const set = new Set()
            for (const item of items) {
              if (item) {
                for (const key in item) {
                  set.add(key)
                  measure(key, item[key])
                }
              }
            }

            const newFields = Array.from(set) as string[]

            setTimeout(() => {
              setFields(newFields)
              setInit(true)
            })

            return { data: items, longest, fields: newFields, onClick }
          }}
          itemSize={ITEM_HEIGHT}
          width={width}
        >
          {Row}
        </IList>
      )}
    </div>
  )
}

const TableFromData = () => {
  return null
}

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    Item {rowIndex},{columnIndex}
  </div>
)

export const Table: FC<TableProps> = ({ style, ...props }) => {
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
            <TableFromQuery width={width} height={height} {...props} />
          ) : (
            <TableFromData width={width} height={height} {...props} />
          ) //<TableInner width={width} height={height} {...props} />
        }}
      </AutoSizer>
    </styled.div>
  )
}

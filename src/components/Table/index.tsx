import React, { FC, CSSProperties, useRef, useState } from 'react'
import { Color } from '~/types'
import { color } from '~/utils'
import { FixedSizeList } from 'react-window'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  MoreIcon,
} from '~/icons'
import { InfiniteList, InfiniteListQueryResponse } from '../InfiniteList'
import { ReactNode } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import { useContextMenu } from '~/hooks'
import { ContextItem } from '~'

const List = styled(FixedSizeList, scrollAreaStyle)
const IList = styled(InfiniteList, scrollAreaStyle)
const Edit = styled(EditIcon, {
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
})

const isImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/
const ITEM_WIDTH = 96
const ITEM_HEIGHT = 56
const ACTIONS_WIDTH = 128
const HEADER_HEIGHT = 40
const Item: FC<{
  color?: Color
  children: ReactNode
  longestString: ReactNode
  index: number
  height?: number
  onClick?: () => void
  icon?: ReactNode
}> = ({
  color: colorProp,
  children,
  longestString,
  index,
  height = ITEM_HEIGHT,
  onClick,
  icon,
}) => {
  const left = 8
  const right = 24

  return (
    <styled.div
      onClick={onClick}
      style={{
        minWidth: ITEM_WIDTH,
        flexShrink: index,
        height: height,
        position: 'relative',
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex',
        '&:hover': {
          backgroundColor: color('lightgrey:hover'),
        },
      }}
    >
      <Text style={{ visibility: 'hidden', paddingRight: left + right }}>
        {longestString}
      </Text>
      {typeof children === 'string' && (
        <Text
          color={colorProp}
          style={{
            lineHeight: `${height}px`,
            position: 'absolute',
            left: 8,
            right: 24,
            bottom: 0,
            top: 0,
          }}
        >
          {children}
        </Text>
      )}
      {typeof children !== 'string' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
          }}
        >
          {children}
        </div>
      )}
    </styled.div>
  )
}

const Row = ({ data: { data, fields, longest }, index, style }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${color('border')}`,
        ...style,
      }}
    >
      <div
        style={{
          width: ACTIONS_WIDTH,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Checkbox style={{ marginLeft: 24 }} />
        <Edit style={{ marginLeft: 20 }} color="accent" />
      </div>
      {fields.map((field, i) => {
        const value = data[index]?.[field]
        if (isImage.test(value)) {
          return (
            <Item key={field} longestString={longest[field]} index={i}>
              <div
                style={{
                  width: ITEM_HEIGHT,
                  height: ITEM_HEIGHT,
                  backgroundImage: `url(${value})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Item>
          )
        }

        return (
          <Item key={field} longestString={longest[field]} index={i}>
            {isDate(value) ? toDateString(value) : value}
          </Item>
        )
      })}

      <div style={{ flexGrow: 1 }}>
        <MoreIcon
          onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
        />
      </div>
    </div>
  )
}

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
    const minWidth = fields.length * ITEM_WIDTH + ACTIONS_WIDTH // TODO find out why we need this mystery 5px
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
          borderBottom: `1px solid ${color('border')}`,
          height: HEADER_HEIGHT,
          alignItems: 'center',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarGutter: 'stable',
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
            <Item
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
            </Item>
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
          height={height - HEADER_HEIGHT}
          query={(offset, limit) => query(offset, limit, sortField, sortOrder)}
          itemData={(items) => {
            if (fields) {
              if (init) {
                return { data: items, longest, fields }
              }
              for (const item of items) {
                for (const field of fields) {
                  if (field in item) {
                    measure(field, item[field])
                  }
                }
              }
              setTimeout(() => setInit(true))
              return { data: items, longest, fields }
            }

            const set = new Set()
            for (const item of items) {
              for (const key in item) {
                set.add(key)
                measure(key, item[key])
              }
            }

            const newFields = Array.from(set) as string[]

            setTimeout(() => {
              setFields(newFields)
              setInit(true)
            })

            return { data: items, longest, fields: newFields }
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
          return <TableInner width={width} height={height} {...props} />
        }}
      </AutoSizer>
    </styled.div>
  )
}

const SimpleMenu = () => {
  return (
    <>
      <ContextItem
        icon={DuplicateIcon}
        onClick={() => {
          console.log('hello')
        }}
      >
        Duplicate
      </ContextItem>
      <ContextItem icon={DeleteIcon}>Delete</ContextItem>
    </>
  )
}

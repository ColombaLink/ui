// @ts-nocheck
import React, {
  FC,
  CSSProperties,
  useRef,
  useState,
  useEffect,
  Fragment,
} from 'react'
import { border, color, parseDisplayName } from '~/utils'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import { AttachmentIcon } from '~/icons'
import { VariableSizeGrid } from 'react-window'
import { useInfiniteScroll } from '../InfiniteList'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Row } from './Row'
import { isImage } from '~/utils/isImage'
import {
  HEADER_HEIGHT,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  ACTIONS_WIDTH,
} from './constants'
import { toDateString } from '~/utils/date'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { useHover } from '~/hooks'
import { useSchema } from '~/hooks/useSchema'
import { useItemSchema } from '../Content/hooks/useItemSchema'
import stringifyObject from 'stringify-object'

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

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const {
    types,
    items,
    fields,
    onClick,
    setState,
    hoverColumnIndex,
    hoverRowIndex,
  } = data
  const item = items[rowIndex]
  let children, value, field
  const { hover, active, listeners } = useHover()
  const colIndex = columnIndex - 1
  const activeRow = hoverRowIndex === rowIndex
  const activeColumn = hoverColumnIndex === colIndex
  const isCheckbox = columnIndex === 0
  // TODO optimize

  // console.log('What the data?', data)

  const { fields: schemaFields } = useItemSchema(item?.id)
  let hasField
  if (item) {
    if (isCheckbox) {
      children = <Checkbox size={16} />
    } else {
      field = fields[colIndex]
      value = item[field]
      hasField = schemaFields && field in schemaFields
      if (value) {
        const fieldType = types[item.type].fields[field]?.type
        const metaFieldType = types[item.type].fields[field]?.meta?.format

        const prettierObject = (obj) => {
          return stringifyObject(obj, {
            indent: ' ',
            singleQuotes: false,
            doubleQuotes: false,
          })
        }

        if (fieldType) {
          const weight = colIndex ? 400 : 500
          if (fieldType === 'array') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'json') {
            children = (
              <Text weight={400}>
                {prettierObject(JSON.parse(value)).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'boolean') {
            children = <Text weight={400}>{JSON.stringify(value)}</Text>
          } else if (fieldType === 'record') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'set') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'object') {
            children = (
              <Text weight={400}>{prettierObject(value).substring(0, 64)}</Text>
            )
          } else if (fieldType === 'id') {
            children = <Badge color="text">{value}</Badge>
          } else if (fieldType === 'references') {
            children = value.length ? <References value={value} /> : null
          } else if (fieldType === 'timestamp') {
            children = <Text weight={weight}>{toDateString(value)}</Text>
          } else if (fieldType === 'digest') {
            children = (
              <Badge weight={weight}>{value.substring(0, 6) + '...'}</Badge>
            )
          } else if (fieldType === 'string' && metaFieldType === 'markdown') {
            children = <Text weight={weight}>{value.substring(0, 64)}</Text>
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
          } else if (typeof value === 'object') {
            console.warn('incorrect value:', fieldType, item, field, value)
          } else {
            children = <Text weight={400}>{value}</Text>
          }
        }
      }

      if (!children) {
        children =
          activeRow && hasField ? (
            <Text
              color="text"
              style={{
                pointerEvents: 'none',
                opacity: 0.5,
              }}
            >
              {field}
            </Text>
          ) : (
            ''
          )
      }
    }
  }

  useEffect(() => {
    cancelAnimationFrame(data.raf)
    if (hover) {
      setState({ hoverColumnIndex: colIndex, hoverRowIndex: rowIndex })
    } else {
      data.raf = requestAnimationFrame(() => {
        if (
          data.hoverRowIndex === rowIndex &&
          data.hoverColumnIndex === colIndex
        ) {
          setState({ hoverColumnIndex: null, hoverRowIndex: null })
        }
      })
    }
  }, [hover])

  return (
    <div
      {...listeners}
      onClick={() => {
        onClick(item, field, field && types[item.type].fields[field].type)
      }}
      style={{
        ...style,
        top: style.top + HEADER_HEIGHT,
        width: style.width,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        cursor: isCheckbox ? null : hasField ? 'pointer' : 'not-allowed',
        paddingLeft: isCheckbox ? ACTIONS_WIDTH - 36 : 12,
        paddingRight: 12,
        borderBottom: border(1),
        //  borderRight: border(1),
        backgroundColor: color(
          activeRow
            ? activeColumn && !isCheckbox && hasField
              ? 'background:hover'
              : 'background2:hover'
            : 'background'
        ),
      }}
    >
      {children}
    </div>
  )
}

const InnerTable = ({ tableRef, types, items, fields, onClick, ...props }) => {
  const [state, setState] = useState({})
  const { current: itemData } = useRef({})

  Object.assign(itemData, {
    types,
    items,
    fields,
    onClick,
    setState,
    ...state,
  })

  return (
    <Grid {...props} itemData={itemData} ref={tableRef}>
      {Cell}
    </Grid>
  )
}

const HeaderDragLine = ({ index, setColWidths, colWidths }) => {
  const width = 8
  return (
    <styled.div
      onMouseDown={({ currentTarget, clientX: startX }) => {
        // @ts-ignore
        const { offsetWidth } = currentTarget.parentNode
        const onUp = () => {
          removeEventListener('mouseup', onUp)
          removeEventListener('mousemove', onMove)
        }
        const onMove = ({ clientX }) => {
          colWidths[index] = Math.max(40, offsetWidth - (startX - clientX))
          setColWidths([...colWidths])
        }
        addEventListener('mousemove', onMove)
        addEventListener('mouseup', onUp)
      }}
      style={{
        zIndex: 1,
        position: 'absolute',
        right: -width / 2,
        height: 32,
        bottom: 0,
        width,
        cursor: 'col-resize',
        '&:hover>div': {
          backgroundColor: color('border'),
        },
      }}
    >
      <div
        style={{
          marginLeft: width / 2,
          width: 2,
          height: '100%',
        }}
      />
    </styled.div>
  )
}

const Header = ({ width, fields, columnWidth, setColWidths, colWidths }) => {
  // const { hover, active, listeners } = useHover()
  // const [dragging, setDragging] = useState(false)

  return (
    <div
      style={{
        position: 'sticky',
        left: 0,
        paddingLeft: ACTIONS_WIDTH,
        top: 0,
        display: 'flex',
        borderBottom: border(1),
        backgroundColor: color('background'),
        height: HEADER_HEIGHT,
        minWidth: width,
      }}
      // {...listeners}
    >
      {fields.map((field, index) => (
        <div
          key={field}
          style={{
            width: columnWidth(index + 1),
            height: HEADER_HEIGHT,
            position: 'relative',
          }}
        >
          <Text
            color="text2"
            weight="400"
            style={{ paddingLeft: 12, lineHeight: `${HEADER_HEIGHT}px` }}
          >
            {field}
          </Text>
          <HeaderDragLine
            setColWidths={setColWidths}
            colWidths={colWidths}
            index={index}
          />
        </div>
      ))}
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
  const tableRef = useRef()
  const { itemCount, items, onScrollY, loading } = useInfiniteScroll({
    query: (offset, limit) => query(offset, limit, sortField, sortOrder),
    height,
    target,
    language,
    itemSize: ITEM_HEIGHT,
    // treshold: 15,
  })
  const [colWidths, setColWidths] = useState([])

  useEffect(() => {
    if (tableRef.current) {
      const prevColWidths = tableRef.current.colWidths || []
      const columnIndex = Math.max(
        0,
        colWidths.findIndex((val, index) => {
          return val !== prevColWidths[index]
        })
      )

      tableRef.current.resetAfterIndices({
        columnIndex,
      })

      tableRef.current.colWidths = colWidths
    }
  }, [colWidths])

  if (loading) {
    return null
  }

  const types = {
    root: schema.rootType,
    ...schema.types,
  }

  const columnCount = fields.length + 1 // one extra for actions
  const columnWidth = (index) => {
    if (index === 0) {
      return ACTIONS_WIDTH
    }
    index = index - 1
    if (colWidths[index] !== undefined) {
      return colWidths[index]
    }
    const field = fields[index]
    if (field === 'id') {
      return 116
    }
    // if (field === 'children' || field === 'parents') {
    //   return 96
    // }
    return colWidth
  }

  return (
    <InnerTable
      tableRef={tableRef}
      style={scrollAreaStyle}
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      types={types}
      items={items}
      fields={fields}
      onClick={onClick}
      itemKey={({ columnIndex, data: { items, fields }, rowIndex }) =>
        `${items[rowIndex]?.id || rowIndex}-${fields[columnIndex]}`
      }
      innerElementType={({ children, style }) => {
        return (
          <div
            style={{
              ...style,
              width: style.width + ACTIONS_WIDTH,
            }}
          >
            <div>{children}</div>
            <Header
              width={width}
              colWidths={colWidths}
              columnWidth={columnWidth}
              fields={fields}
              setColWidths={setColWidths}
            />
          </div>
        )
      }}
      rowCount={itemCount}
      estimatedColumnWidth={colWidth}
      estimatedRowHeight={ITEM_HEIGHT}
      rowHeight={() => ITEM_HEIGHT}
      width={width}
      onScroll={({ scrollTop }) => onScrollY(scrollTop)}
    />
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

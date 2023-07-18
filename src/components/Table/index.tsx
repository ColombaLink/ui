import React, {
  FC,
  createElement,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useMemo,
  useEffect,
} from 'react'
import {
  styled,
  border,
  Text,
  color,
  Badge,
  AttachmentIcon,
  AudioIcon,
  PlayIcon,
  FileIcon,
  TextIcon,
} from '~'
import AutoSizer from 'react-virtualized-auto-sizer'
import { TableProps, TableHeader, SortOptions } from './types'
import { useInfiniteQuery } from './useInfiniteQuery'
import { prettyNumber } from '@based/pretty-number'
import { VariableSizeGrid as Grid } from 'react-window'
import { prettyDate } from '@based/pretty-date'
import { type } from 'os'

export * from './types'

const GreySquareBg = styled('div', {
  position: 'absolute',
  top: -4,
  width: 32,
  borderRadius: 4,
  height: 32,
  backgroundColor: color('background2'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Header: FC<{
  headerWidth: number
  width: number
  headers: TableHeader<any>[]
  setSortOptions: Dispatch<SetStateAction<SortOptions>>
  sortOptions: SortOptions
  outline: boolean
}> = ({ headers, width, headerWidth, outline }) => {
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
          height: 46,
          width: w,
        }}
      >
        {header.customLabelComponent ? (
          <header.customLabelComponent />
        ) : (
          <Text typography="body600" color={outline ? 'text2' : 'text'}>
            {header.label ?? header.key}
          </Text>
        )}
      </styled.div>
    )
    total += w
  }
  return (
    <styled.div
      style={{
        width,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        height: 46,
        position: 'relative',
      }}
    >
      {children}
    </styled.div>
  )
}

const pathReader = (a: any, path: string[]): any => {
  let d = a
  for (let i = 0; i < path.length; i++) {
    const seg = path[i]
    if (d?.[seg] !== undefined) {
      d = d[seg]
    } else {
      d = undefined
      break
    }
  }
  return d
}

const Cell = (props) => {
  const { columnIndex, rowIndex, style, data } = props
  const header = data.headers[columnIndex]
  const colls = data.headers.length
  const rowData = data.data[rowIndex]
  if (!rowData) {
    return <div />
  }

  const key = header.key

  let itemData
  if (Array.isArray(key)) {
    for (const k of key) {
      itemData = pathReader(rowData, k.split('.'))
      if (itemData) {
        break
      }
    }

    console.info(rowData, itemData)
  } else {
    itemData = pathReader(rowData, header.key.split('.'))
  }

  const onClick = header.onClick ?? props.data.onClick

  const type = header.type

  const isReferences = type === 'references'
  const isReference = type === 'reference'
  const isFile = type === 'file'

  const mimeType =
    header?.mimeType ?? header.mimeTypeKey
      ? pathReader(rowData, header.mimeTypeKey.split('.'))
      : undefined

  const isImg = mimeType?.includes('image/')
  const isVideo = mimeType?.includes('video/')
  const isAudio = mimeType?.includes('audio/')
  const isTextFile = mimeType?.includes('text/')
  const isFontFile = mimeType?.includes('font/')

  if (isReferences) {
    itemData = itemData?.length || 0
  }

  const body = header.customComponent ? (
    createElement(header.customComponent, {
      data: rowData,
      header,
      context: props,
      columnIndex,
      rowIndex,
    })
  ) : type === 'id' ? (
    <Badge color="accent">{itemData}</Badge>
  ) : type === 'timestamp' ? (
    <Text selectable typography="body400">
      {prettyDate(itemData, 'date-time-human')}{' '}
    </Text>
  ) : isImg ? (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          borderRadius: 4,
          height: 32,
          backgroundColor: color('accent', true),
          backgroundSize: 'cover',
          backgroundImage: `url(${itemData})`,
        }}
      />
    </styled.div>
  ) : isVideo ? (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          height: 32,
          borderRadius: 4,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlayIcon style={{ color: 'white', position: 'absolute' }} size={14} />
        <video src={itemData + '#t=5'} />
      </styled.div>
    </styled.div>
  ) : isAudio ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <AudioIcon />
      </GreySquareBg>
    </styled.div>
  ) : isTextFile ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <FileIcon />
      </GreySquareBg>
    </styled.div>
  ) : isFontFile ? (
    <styled.div style={{ position: 'relative' }}>
      <GreySquareBg>
        <TextIcon size={14} />
      </GreySquareBg>
    </styled.div>
  ) : isReference || isFile ? (
    <styled.div style={{ position: 'relative' }}>
      <styled.div
        style={{
          position: 'absolute',
          top: -4,
          width: 32,
          borderRadius: 4,
          height: 32,
          backgroundColor: color('lightaccent'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AttachmentIcon color="accent" size={14} />
      </styled.div>
    </styled.div>
  ) : isReferences ? (
    <Badge color="accent" icon={<AttachmentIcon />}>
      <Text typography="caption600" color="accent">
        {prettyNumber(itemData, 'number-short')}
      </Text>
    </Badge>
  ) : (
    <Text selectable>{typeof itemData === 'object' ? 'isObj' : itemData} </Text>
  )

  return (
    <styled.div
      onMouseEnter={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                x.style.background = color('accent', true)
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                x.style.background = color('accent', true)
                x = x.nextSibling
              }
            }
          : null
      }
      onMouseLeave={
        onClick
          ? (e) => {
              const t = e.currentTarget
              let x = t
              for (let i = 0; i < columnIndex + 1; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.previousSibling
              }
              x = t
              for (let i = 0; i < colls - columnIndex; i++) {
                if (!x) {
                  break
                }
                x.style.background = null
                x = x.nextSibling
              }
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
    headers = [],
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

  const headerWrapper = useRef(null)

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

  const timer = useRef<ReturnType<typeof setTimeout>>()

  const [force, setForce] = useState(0)
  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setForce(0)
    }, 100)
    setForce(width)
    return () => {
      clearTimeout(timer.current)
    }
  }, [width])

  if (force !== 0) {
    return <div />
  }

  return (
    <>
      <styled.div
        style={{
          width: width,
          overflowX: 'hidden',
          borderBottom: border(1, 'border'),
          backgroundColor: props.outline ? color('background2') : '',
          borderTopRightRadius: props.outline ? 8 : 0,
          borderTopLeftRadius: props.outline ? 8 : 0,
        }}
        ref={headerWrapper}
      >
        <Header
          sortOptions={sortOptions}
          setSortOptions={setSortOpts}
          width={width}
          headers={headers}
          headerWidth={defW}
          outline={props.outline}
        />
      </styled.div>
      <Grid
        onScroll={(e) => {
          result.onScrollY(e.scrollTop)
          headerWrapper.current.scrollLeft = e.scrollLeft
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
        border: props.outline ? border(1, 'border') : 'none',
        borderRadius: props.outline ? 8 : 0,
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

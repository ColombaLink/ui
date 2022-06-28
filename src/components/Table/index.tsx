import React, { FC, CSSProperties, useRef, useState } from 'react'
import { Size, Color, Weight, Space } from '~/types'
import { color, font, spaceToPx } from '~/utils'
import { FixedSizeList } from 'react-window'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import { EditIcon } from '~/icons'
import { InfiniteList, InfiniteListQuery } from '../InfiniteList'
import { ReactNode } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useCallback } from 'react'

const List = styled(FixedSizeList, scrollAreaStyle)
const Edit = styled(EditIcon, {
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
})

const isImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/
const ITEM_WIDTH = 56
const ITEM_MARGIN = 32
const ACTIONS_WIDTH = 128
const Item: FC<{
  color?: Color
  children: ReactNode
  longestString: ReactNode
  index: number
  isImage?: boolean
}> = ({ color, children, longestString, index, isImage }) => {
  return (
    <div
      style={{
        marginRight: ITEM_MARGIN,
        minWidth: ITEM_WIDTH,
        flexShrink: index,
        position: 'relative',
      }}
    >
      {isImage ? (
        <>
          <Text style={{ visibility: 'hidden', height: 0 }}>
            {longestString}
          </Text>
          {children}
        </>
      ) : (
        <>
          <Text style={{ visibility: 'hidden' }}>{longestString}</Text>
          <Text
            color={color}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          >
            {children}
          </Text>
        </>
      )}
    </div>
  )
}

const Row = ({ data: { data, fields, longest }, index, style }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${color('OtherDivider')}`,
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
      <Checkbox style={{ marginLeft: ITEM_MARGIN }} />
      <Edit style={{ marginLeft: 20 }} color="PrimaryMain" />
    </div>
    {fields.map((field, i) => {
      const value = data[index]?.[field]
      if (isImage.test(value)) {
        return (
          <Item key={field} longestString={longest[field]} index={i} isImage>
            <div
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                backgroundImage: `url(${value})`,
                backgroundSize: 'cover',
              }}
            />
          </Item>
        )
      }

      return (
        <Item key={field} longestString={longest[field]} index={i}>
          {value}
        </Item>
      )
    })}
  </div>
)

type Fields =
  | {
      [field: string]: string
    }
  | string[]

type Data = {
  [field: string]: any
}[]

// type TableProps = {
//   fields: Fields
//   data: Data
//   itemSize?: number
//   style?: CSSProperties
// }
// //  | {
// //   fields: Fields
// //   query: object
// //   itemSize?: number
// //   style?: CSSProperties
// // }

// // TODO handle nested fields
// export const Table: FC<TableProps> = ({
//   fields: fieldsProp = [],
//   data = [],
//   itemSize = ITEM_WIDTH,
//   style,
// }) => {
//   const ctx = useRef<CanvasRenderingContext2D>()
//   if (!ctx.current) {
//     const c = document.createElement('canvas')
//     ctx.current = c.getContext('2d')
//   }
//   const isArray = Array.isArray(fieldsProp)
//   const labels = isArray
//     ? fieldsProp.map((header) =>
//         header
//           .replace(/([A-Z])/g, ' $1')
//           .replace(/^./, (str) => str.toUpperCase())
//       )
//     : Object.values(fieldsProp)
//   const fields = isArray ? fieldsProp : Object.keys(fieldsProp)
//   const textWidths = {}
//   const longest = {}

//   const measure = (field, value) => {
//     const { width } = ctx.current.measureText(value)
//     if (textWidths[field] >= width) return
//     textWidths[field] = width
//     longest[field] = value
//   }

//   fields.forEach((field, i) => {
//     measure(field, labels[i])
//   })

//   const parsed = data.map((item) => {
//     const obj = {}
//     for (const field of fields) {
//       let value = item[field]
//       if (isImage.test(value)) {
//         obj[field] = value
//       } else {
//         if (typeof value === 'number') {
//           if (value >= 946681200000) {
//             value = new Date(value).toLocaleString('local', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric',
//               hour: 'numeric',
//               minute: 'numeric',
//             })
//           }
//         }
//         measure(field, value)
//         obj[field] = value
//       }
//     }
//     return obj
//   })

//   return (
//     <div style={{ width: '100%', ...style }}>
//       <div
//         style={{
//           display: 'flex',
//           borderBottom: `1px solid ${color('OtherDivider')}`,
//           height: 40,
//           alignItems: 'center',
//         }}
//       >
//         <div style={{ width: ACTIONS_WIDTH }}>
//           <Checkbox
//             style={{ marginLeft: ITEM_MARGIN }}
//             onChange={(checked) => {
//               // for (const item of )
//             }}
//           />
//         </div>
//         {labels.map((label, i) => (
//           <Item key={label} longestString={longest[fields[i]]}>
//             {label}
//           </Item>
//         ))}
//       </div>
//       <List
//         height={400}
//         itemCount={data.length}
//         itemSize={itemSize}
//         itemData={{ fields, data: parsed, longest }}
//         width="100%"
//       >
//         {Row}
//       </List>
//     </div>
//   )
// }

type TableProps = {
  fields: Fields
  query: InfiniteListQuery
  itemSize?: number
  style?: CSSProperties
  width?: number
  height?: number
}

// TODO handle nested fields
const TableInner: FC<TableProps> = ({
  fields: fieldsProp,
  query,
  style,
  width,
  height,
}) => {
  const [init, setInit] = useState<boolean>()
  const isObject = fieldsProp && !Array.isArray(fieldsProp)
  // @ts-ignore
  const [fields, setFields] = useState<string[]>(() =>
    isObject ? Object.keys(fieldsProp) : fieldsProp
  )
  const { current: longest } = useRef({})
  const { current: textWidths } = useRef({})
  const ctx = useRef<CanvasRenderingContext2D>()

  let labels

  const measure = (field, value) => {
    if (!isImage.test(value)) {
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
    const minWidth = fields.length * (ITEM_WIDTH + ITEM_MARGIN) + ACTIONS_WIDTH
    if (minWidth > width) {
      width = minWidth
    }
  }

  // const parsed = data.map((item) => {
  //   const obj = {}
  //   for (const field of fields) {
  //     let value = item[field]
  //     if (isImage.test(value)) {
  //       obj[field] = value
  //     } else {
  //       if (typeof value === 'number') {
  //         if (value >= 946681200000) {
  //           value = new Date(value).toLocaleString('local', {
  //             day: 'numeric',
  //             month: 'long',
  //             year: 'numeric',
  //             hour: 'numeric',
  //             minute: 'numeric',
  //           })
  //         }
  //       }
  //       measure(field, value)
  //       obj[field] = value
  //     }
  //   }
  //   return obj
  // })

  console.log({ width, height })

  return (
    <>
      <div
        style={{
          width,
          display: 'flex',
          borderBottom: `1px solid ${color('OtherDivider')}`,
          height: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ width: ACTIONS_WIDTH, flexShrink: 0 }}>
          <Checkbox
            style={{ marginLeft: ITEM_MARGIN }}
            onChange={(checked) => {
              // for (const item of )
            }}
          />
        </div>
        {labels?.map((label, i) => {
          return (
            <Item
              key={label}
              color="TextSecondary"
              longestString={longest[fields[i]]}
              index={i}
            >
              {label}
            </Item>
          )
        })}
      </div>
      <InfiniteList
        height={height - 40}
        query={query}
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
        // itemCount={data.length}
        itemSize={ITEM_WIDTH}
        // itemData={{ fields, data: parsed, longest }}
        width={width}
      >
        {Row}
      </InfiniteList>
    </>
  )
}

export const Table: FC<TableProps> = ({ style, ...props }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        ...style,
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <TableInner width={width} height={height} {...props} />
        )}
      </AutoSizer>
    </div>
  )
}

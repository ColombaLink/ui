import React, { FC, CSSProperties, useRef } from 'react'
import { Size, Color, Weight, Space } from '~/types'
import { color, font, spaceToPx } from '~/utils'
import { FixedSizeList } from 'react-window'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Checkbox } from '../Checkbox'
import { EditIcon } from '~/icons'

const List = styled(FixedSizeList, scrollAreaStyle)
const Edit = styled(EditIcon, {
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
})

const isImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/

const Item = ({ children, longestString }) => {
  return (
    <Text weight="400" style={{ marginRight: 32, minWidth: 56 }}>
      <div style={{ height: 0, visibility: 'hidden' }}>{longestString}</div>
      {children}
    </Text>
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
        width: 128,
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <Checkbox style={{ marginLeft: 32 }} />
      <Edit style={{ marginLeft: 20 }} color="PrimaryMain" />
    </div>
    {fields.map((field) => {
      const value = data[index][field]
      if (isImage.test(value)) {
        return (
          <Item key={field} longestString={longest[field]}>
            <div
              style={{
                width: 56,
                height: 56,
                backgroundImage: `url(${value})`,
                backgroundSize: 'cover',
              }}
            />
          </Item>
        )
      }

      return (
        <Item key={field} longestString={longest[field]}>
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

type TableProps = {
  fields: Fields
  data: Data
  itemSize?: number
  style?: CSSProperties
}
//  | {
//   fields: Fields
//   query: object
//   itemSize?: number
//   style?: CSSProperties
// }

// TODO handle nested fields
export const Table: FC<TableProps> = ({
  fields: fieldsProp = [],
  data = [],
  itemSize = 56,
  style,
}) => {
  const ctx = useRef<CanvasRenderingContext2D>()
  if (!ctx.current) {
    const c = document.createElement('canvas')
    ctx.current = c.getContext('2d')
  }
  const isArray = Array.isArray(fieldsProp)
  const labels = isArray
    ? fieldsProp.map((header) =>
        header
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
      )
    : Object.values(fieldsProp)
  const fields = isArray ? fieldsProp : Object.keys(fieldsProp)
  const textWidths = {}
  const longest = {}

  const measure = (field, value) => {
    const { width } = ctx.current.measureText(value)
    if (textWidths[field] >= width) return
    textWidths[field] = width
    longest[field] = value
  }

  fields.forEach((field, i) => {
    measure(field, labels[i])
  })

  const parsed = data.map((item) => {
    const obj = {}
    for (const field of fields) {
      let value = item[field]
      if (isImage.test(value)) {
        obj[field] = value
      } else {
        if (typeof value === 'number') {
          if (value >= 946681200000) {
            value = new Date(value).toLocaleString('local', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          }
        }
        measure(field, value)
        obj[field] = value
      }
    }
    return obj
  })

  // const onChecked = (index, checked) => {
  //   parsed[index]._checked = checked
  // }

  return (
    <div style={{ width: '100%', ...style }}>
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${color('OtherDivider')}`,
          height: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ width: 128 }}>
          <Checkbox
            style={{ marginLeft: 32 }}
            onChange={(checked) => {
              // for (const item of )
            }}
          />
        </div>
        {labels.map((label, i) => (
          <Item key={label} longestString={longest[fields[i]]}>
            {label}
          </Item>
        ))}
      </div>
      <List
        height={400}
        itemCount={data.length}
        itemSize={itemSize}
        itemData={{ fields, data: parsed, longest }}
        width="100%"
      >
        {Row}
      </List>
    </div>
  )
}

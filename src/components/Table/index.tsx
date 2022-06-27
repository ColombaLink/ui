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

type TableProps = {}

const isImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/

const Item = ({ children, longestString, style }) => {
  return (
    <Text weight="400" style={{ marginRight: 32, minWidth: 56, ...style }}>
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
      <EditIcon style={{ marginLeft: 20 }} color="PrimaryMain" />
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

export const Table: FC<TableProps> = ({
  headers = [],
  data = [],
  itemSize = 56,
  style,
}) => {
  const ctx = useRef<CanvasRenderingContext2D>()
  if (!ctx.current) {
    const c = document.createElement('canvas')
    ctx.current = c.getContext('2d')
  }
  const fields = Array.isArray(headers) ? headers : Object.keys(headers)
  const textWidths = {}
  const longest = {}

  const measure = (field, value) => {
    const { width } = ctx.current.measureText(value)
    if (textWidths[field] >= width) return
    textWidths[field] = width
    longest[field] = value
  }

  for (const field of fields) {
    measure(field, field)
  }

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

  return (
    <div style={{ width: '100%', ...style }}>
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${color('OtherDivider')}`,
          paddingLeft: 128,
        }}
      >
        {fields.map((field) => (
          <Item
            key={field}
            longestString={longest[field]}
            style={{
              padding: '8px 0',
            }}
          >
            {field}
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

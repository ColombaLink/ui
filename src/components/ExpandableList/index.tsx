import React, { CSSProperties, useEffect, useState, ReactNode, FC } from 'react'
import { Text, ExpandIcon } from '~'
import { styled } from 'inlines'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

import AutoSizer from 'react-virtualized-auto-sizer'

type ExpandableListProps = {
  style?: CSSProperties
  data?: any
  height?: number
  topRight?: ReactNode | string
  topLeft?: ReactNode | string
}

type ExpandableListItemProps = {
  style?: CSSProperties
  index?: number | string
  item?: any
  total?: number
  height?: number
}

const StyledUl = styled('ul', {
  listStyleType: 'none',
  paddingInlineStart: '20px',
  '& .percentage-class': {
    display: 'none',
  },
  '& > li': {
    position: 'relative',
  },
  '& > li:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    width: '200%',
    left: '-100%',
    borderTop: '1px solid #e0e0e0',
  },
})

const ExpandableListItem = ({
  item,
  index,
  style,
  total,
}: ExpandableListItemProps) => {
  let children = null

  const [expanded, setExpanded] = useState(false)

  if (item.items && item.items.length > 0 && expanded) {
    children = (
      <StyledUl>
        {item.items.map((child, i) => (
          <ExpandableListItem
            key={`${index}-expandendedItem-${i}`}
            item={child}
            index={`${index}-expandendedItem-${i}`}
            style={{}}
          />
        ))}
      </StyledUl>
    )
  }

  return (
    <li
      onClick={(e) => {
        e.stopPropagation()
        // damn , this just works !
        setExpanded(!expanded)
      }}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 54,
            ...style,
          }}
        >
          {item.items && item.items.length ? (
            <ExpandIcon
              style={{
                marginRight: 12,
                transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            />
          ) : (
            <div style={{ width: 32 }}></div>
          )}
          <Text>{item.title}</Text>
        </div>
        <div style={{ paddingRight: 8, display: 'flex' }}>
          <Text style={{ marginRight: 4 }}>{item.value}</Text>
          {typeof item.value === 'number' && (
            <span className="percentage-class">
              <Text color="accent">
                ({`${((item.value / total) * 100).toFixed(2)}%`})
              </Text>
            </span>
          )}
        </div>
      </div>

      {children}
    </li>
  )
}

export const ExpandableList: FC<ExpandableListProps> = ({
  data,
  height = 240,
  topLeft,
  topRight,
}) => {
  const getTotalFromData = (data) => {
    let total = 0
    for (let i = 0; i < data.length; i++) {
      total += data[i].value
    }
    return total
  }
  const totalValue = getTotalFromData(data)

  return (
    <div style={{ overflowX: 'hidden', height: height }}>
      {topRight || topLeft ? (
        <div
          style={{
            display: 'flex',
            height: 54,
            padding: '0px 8px 0px 3px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {typeof topLeft === 'string' ? (
            <Text weight={600}>{topLeft}</Text>
          ) : (
            <div>{topLeft}</div>
          )}
          {typeof topRight === 'string' ? (
            <Text weight={600}>{topRight}</Text>
          ) : (
            <div>{topRight}</div>
          )}
        </div>
      ) : null}
      <StyledUl
        style={{
          paddingInlineStart: '0px',
          '& .percentage-class': {
            display: 'inline-block',
          },
        }}
      >
        {data.map((item, index) => (
          <ExpandableListItem
            key={index}
            item={item}
            index={index}
            total={totalValue}
          />
        ))}
      </StyledUl>
    </div>
  )
}
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { Text, ExpandIcon } from '~'
import { styled } from 'inlines'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type ExpandableListProps = {
  style?: CSSProperties
  data?: any
}

type ExpandableListItemProps = {
  style?: CSSProperties
  index?: number | string
  item?: any
}

// must be better way to do this
const StyledUl = styled('ul', {
  listStyleType: 'none',
  paddingInlineStart: '20px',
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

  console.log(item)

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
            <ExpandIcon style={{ marginRight: 12 }} />
          ) : (
            <div style={{ width: 32 }}></div>
          )}
          <Text>{item.title}</Text>
        </div>
        <div style={{ paddingRight: 8, display: 'flex' }}>
          <Text>{item.value} </Text>
          <Text color="accent">(% van Total)</Text>
        </div>
      </div>

      {children}
    </li>
  )
}

export const ExpandableList = ({ data }: ExpandableListProps) => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <StyledUl style={{ paddingInlineStart: '0px' }}>
        {data.map((item, index) => (
          <ExpandableListItem key={index} item={item} index={index} />
        ))}
      </StyledUl>
    </div>
  )
}

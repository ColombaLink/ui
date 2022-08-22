import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { ExpandIcon } from '~'
import { styled } from 'inlines'

type ExpandableListProps = {
  style?: CSSProperties
  data?: any
}

type ExpandableListItemProps = {
  style?: CSSProperties
  index?: number | string
  item?: any
}

const StyledUl = styled('ul', {
  listStyleType: 'none',
  paddingInlineStart: '20px',
  '& li > div': {
    backgroundColor: '#f1f1f1',
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
          height: 40,
          borderBottom: '1px solid #333',
          ...style,
        }}
      >
        {item.items && item.items.length ? (
          <ExpandIcon style={{ marginRight: 8 }} />
        ) : (
          <div style={{ width: 32 }}></div>
        )}
        {item.title}
      </div>

      {children}
    </li>
  )
}

export const ExpandableList = ({ data }: ExpandableListProps) => {
  return (
    <div>
      <StyledUl>
        {data.map((item, index) => (
          <ExpandableListItem key={index} item={item} index={index} />
        ))}
      </StyledUl>
    </div>
  )
}

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { ExpandIcon } from '~'

type ExpandableListProps = {
  style?: CSSProperties
  data?: any
}

const ExpandableListItem = ({ item, index }) => {
  let children = null

  const [expanded, setExpanded] = useState(false)

  if (item.items && item.items.length > 0 && expanded) {
    children = (
      <ul style={{ paddingInlineStart: 40, listStyleType: 'none' }}>
        {item.items.map((child, i) => (
          <ExpandableListItem
            key={`${index}-expandendedItem-${i}`}
            item={child}
            index={`${index}-expandendedItem-${i}`}
          />
        ))}
      </ul>
    )
  }

  console.log(item)
  return (
    <li
      onClick={(e) => {
        e.stopPropagation()
        console.log('clicked: ' + index)
        // damn , this just works !
        setExpanded(!expanded)
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 42,
          borderBottom: '1px solid #333',
        }}
      >
        <ExpandIcon style={{ marginRight: 8 }} />
        {item.title}
      </div>

      {children}
    </li>
  )
}

export const ExpandableList = ({ data }: ExpandableListProps) => {
  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        {data.map((item, index) => (
          <ExpandableListItem key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  )
}

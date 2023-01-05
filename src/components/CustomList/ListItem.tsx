import React, { CSSProperties } from 'react'

type ListItemProps = {
  index?: number

  style?: CSSProperties
}

export const ListItem = ({ index, style }: ListItemProps) => {
  return (
    <div
      style={{
        backgroundColor: index % 2 === 0 ? 'lightblue' : '#f6f6f6',
        ...style,
      }}
    >
      testing item {index}
    </div>
  )
}

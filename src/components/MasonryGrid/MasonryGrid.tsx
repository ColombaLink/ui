import React, { ReactNode, FC, CSSProperties } from 'react'
import { styled } from 'inlines'

type MasonryGridProps = {
  children: ReactNode
  columns?: number
  style?: CSSProperties
}

export const MasonryGrid: FC<MasonryGridProps> = ({
  children,
  columns = 3,
  style,
}) => {
  return (
    <styled.div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: '250px',
        gap: '20px',
        ...style,
        '& div': {
          minWidth: '100%',
          minHeight: '100%',
        },
        '& .short': {
          gridRow: 'span 1',
        },
        '& .tall': {
          gridRow: 'span 2',
        },
      }}
    >
      {children}
    </styled.div>
  )
}

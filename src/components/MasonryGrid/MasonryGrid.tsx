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
        // display: 'grid',
        // gridTemplateColumns: `repeat(${columns}, 1fr)`,
        // gridTemplateRows: 'masonry',
        // gap: '10px',
        //  columns: `${columns} 200px`,
        columnCount: 3,
        columnWidth: '200px',
        //  columns: '6 200px',
        columnGap: '10px',
        ...style,
        '& div': {
          display: 'inline-block',
          width: '100%',
          maxWidth: '200px',
          // margin: '5px',
        },
        '& div > img': {
          width: '100%',
        },
      }}
    >
      {children}
    </styled.div>
  )
}

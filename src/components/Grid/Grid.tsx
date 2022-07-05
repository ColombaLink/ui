import React, { FC, ReactNode, CSSProperties } from 'react'

type GridProps = {
  children?: ReactNode
  columns?: number
  columnGap?: number
  rowGap?: number
  wrap?: boolean
  style?: CSSProperties
}

export const Grid: FC<GridProps> = ({
  columns = 3,
  columnGap,
  rowGap,
  children,
  wrap,
  style,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        width: wrap ? 'fit-content' : '100%',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        rowGap: rowGap,
        columnGap: columnGap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

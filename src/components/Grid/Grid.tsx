import React, { FC, ReactNode } from 'react'

type GridProps = {
  children?: ReactNode
  width?: number | string
  gap?: number
}

export const Grid: FC<GridProps> = ({ width, gap, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: width,
        width: '100%',
        gap: gap,
        flexWrap: 'wrap',
        alignContent: 'stretch',
      }}
    >
      {children}
    </div>
  )
}

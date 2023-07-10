import React, { FC, ReactNode } from 'react'
import { styled, Style } from '~'

type GridProps = {
  children?: ReactNode[]
  gap?: number
  itemWidth?: number
  style?: Style
}

export const Grid: FC<GridProps> = ({
  children,
  itemWidth,
  gap,
  style,
  ...props
}) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        ...style,
      }}
      {...props}
    >
      {children?.map((child, idx) => (
        <styled.div
          style={{
            width: '100%',
            maxWidth: itemWidth,
            display: 'table',
            margin: gap / 2,
          }}
          key={idx}
        >
          {child}
        </styled.div>
      ))}
    </styled.div>
  )
}

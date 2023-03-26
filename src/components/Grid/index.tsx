import React, { FC, ReactNode } from 'react'
import { styled, Space, Style, spaceToPx } from '~'

type GridProps = {
  children?: ReactNode[]
  gap?: number
  itemWidth?: number
  space?: Space
  style?: Style
}

export const Grid: FC<GridProps> = ({
  children,
  itemWidth,
  gap,
  space,
  style,
  ...props
}) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: spaceToPx(space),
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

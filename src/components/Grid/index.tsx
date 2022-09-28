import React, { FC, ReactNode, CSSProperties } from 'react'
import { Space } from '~/types'
import { spaceToPx } from '~/utils/spaceToPx'
import { styled } from 'inlines'

type GridProps = {
  children?: ReactNode[]
  gap?: number
  itemWidth?: number
  space?: Space
  style?: CSSProperties
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
        <div
          style={{
            width: '100%',
            maxWidth: itemWidth,
            display: 'table',
            margin: gap / 2,
          }}
          key={idx}
        >
          {child}
        </div>
      ))}
    </styled.div>
  )
}

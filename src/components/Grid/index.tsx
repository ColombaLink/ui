import React, { FC, ReactNode, CSSProperties } from 'react'
import { Space } from '~/types'
import { spaceToPx } from '~/utils/spaceToPx'

type GridProps = {
  children?: ReactNode
  columns?: number
  columnDistribution?: string
  columnGap?: number
  rowGap?: number
  wrap?: boolean
  space?: Space
  style?: CSSProperties
}

export const Grid: FC<GridProps> = ({
  columns,
  columnGap,
  columnDistribution,
  rowGap,
  children,
  wrap,
  space,
  style,
}) => {
  const columnDistributionHandler = (str) => {
    const tempArr = str.split(' ')
    for (let i = 0; i < tempArr.length; i++) {
      if (!tempArr[i].includes('fr') && !tempArr[i].includes('px')) {
        tempArr[i] = tempArr[i] + 'fr'
      }
    }
    return tempArr.join(' ')
  }

  return (
    <div
      style={{
        display: 'grid',
        width: wrap ? 'fit-content' : '100%',
        gridTemplateColumns: columnDistribution
          ? columnDistributionHandler(columnDistribution)
          : columns
          ? `repeat(${columns}, 1fr)`
          : null,
        rowGap: rowGap,
        columnGap: columnGap,
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

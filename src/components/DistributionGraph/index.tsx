import React, { FC, ReactNode, useState } from 'react'
import {
  Text,
  Style,
  styled,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Color,
  color,
} from '~'

type DistributionGraphProps = {
  data?: number[]
  bars?: number
  label?: ReactNode
  barLabels?: (min: number, max: number, data: number[]) => {}
  style?: Style
  color?: Color
}

export const DistributionGraph: FC<DistributionGraphProps> = ({
  style,
  data = [],
  bars = 10,
  color: colorProp = 'accent',
}) => {
  let min = undefined
  let max = undefined
  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    if (min === undefined || d < min) {
      min = d
    }
    if (max === undefined || d > max) {
      max = d
    }
  }

  const barsData = []

  const spread = Math.round((max - min) / (bars - 1))

  let maxCnt = 0

  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    const j = Math.round(d / spread)
    if (!barsData[j - 1]) {
      barsData[j - 1] = 0
    }
    barsData[j - 1]++
    if (barsData[j - 1] > maxCnt) {
      maxCnt = barsData[j - 1]
    }
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        ...style,
        height: '100%',
      }}
    >
      {barsData.map((v, i) => {
        return (
          <styled.div
            key={i}
            style={{
              width: `${100 / bars}%`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <styled.div
              style={{
                flexGrow: 1,
              }}
            />
            <styled.div
              style={{
                width: '100%',
                background: color(colorProp),
                opacity: (i / bars) * 0.75 + 0.25,
                height: `${(v / maxCnt) * 100}%`,
              }}
            />
          </styled.div>
        )
      })}
    </styled.div>
  )
}

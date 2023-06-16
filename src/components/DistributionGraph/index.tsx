import React, { FC, ReactNode, useState } from 'react'
import { Text, Style, styled, Color, color } from '~'
import { prettyNumber, NumberFormat } from '@based/pretty-number'

type DistributionGraphProps = {
  data?: number[]
  bars?: number
  label?: ReactNode
  barLabels?: (min: number, max: number, data: number[]) => {}
  style?: Style
  margin?: number
  hideLabels?: boolean
  borderRadius?: number
  fontStyle?: Style
  color?: Color
  format?: NumberFormat
}

export const DistributionGraph: FC<DistributionGraphProps> = ({
  style,
  data = [],
  bars = 10,
  fontStyle,
  label,
  borderRadius = 0,
  margin = 0,
  hideLabels,
  color: colorProp = 'accent',
  format = 'number-short',
}) => {
  let min = undefined
  let max = undefined

  if (data.length < bars) {
    bars = data.length
  }

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
    if (!barsData[j]) {
      barsData[j] = 0
    }
    barsData[j]++
    const value = barsData[j]
    if (value > maxCnt) {
      maxCnt = value
    }
  }

  // @ts-ignore
  const fSize = fontStyle?.fontSize ? fontStyle.fontSize - 14 : 0

  return (
    <styled.div
      style={{
        ...style,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {label ? (
        <Text
          weight={'700'}
          style={{ marginBottom: 8 + margin / 2 + fSize, ...fontStyle }}
        >
          {label}
        </Text>
      ) : null}
      <styled.div
        style={{
          display: 'flex',
          height: '100%',
          marginLeft: -(margin / 2),
          marginRight: -(margin / 2),
        }}
      >
        {barsData.map((v, i) => {
          return (
            <styled.div
              key={i}
              style={{
                width: `${100 / bars}%`,
                height: '100%',
                paddingLeft: margin / 2,
                paddingRight: margin / 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <styled.div
                key={i}
                style={{
                  width: `100%`,
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
                    borderRadius,
                    background: color(colorProp),
                    opacity: (i / bars) * 0.75 + 0.25,
                    height: `${(v / maxCnt) * 100}%`,
                  }}
                />
              </styled.div>
              <styled.div
                style={{
                  marginTop: margin / 2 + 8 + fSize,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: hideLabels ? 'none' : 'flex',
                }}
              >
                <Text weight={'700'} style={fontStyle}>
                  {prettyNumber(i * spread, format)}
                </Text>
                <Text
                  style={{
                    marginLeft: 8,
                    marginRight: 8,
                    ...fontStyle,
                  }}
                  weight={'700'}
                >
                  -
                </Text>
                <Text weight={'700'} style={fontStyle}>
                  {prettyNumber((i + 1) * spread, format)}
                </Text>
              </styled.div>
            </styled.div>
          )
        })}
      </styled.div>
    </styled.div>
  )
}

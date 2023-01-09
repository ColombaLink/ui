import React, { useRef, useEffect, useState } from 'react'
import { Text } from '~'
import genPath from './genPath'
import genLabels from './genLabels'
import XAxis from './XAxis'
import OverlayWrapper from './OverlayWrapper'
import Labels from './Labels'
import { averageOrAddData } from './utils'
import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { Data } from './types'
import { Color } from '~/types'

type MultilineGraphProps = {
  width: number
  height: number
  data: Data[]
  legend?: { [key: string]: string }
  format?: 'date' | 'number' | 'date-time-human' | NumberFormat | DateFormat
  valueFormat?: NumberFormat | string
  spread?: boolean
  pure?: boolean
  label?: string
  baseColor?: Color
}
const MultilineGraph = ({
  width,
  height,
  data,
  format,
  label,
  spread,
  valueFormat,
  pure,
  baseColor,
}: MultilineGraphProps) => {
  const ref = useRef<any>()
  let maxY: number, minY: number
  let maxX: number, minX: number

  const [xWidth, updateW] = useState(0)

  data = data.map((d) => averageOrAddData(d, width, spread))

  data.forEach((d) => {
    for (let i = 0; i < d.length; i++) {
      const { x, y } = d[i]
      if (maxY === undefined || y > maxY) {
        maxY = y
      }
      if (minY === undefined || y < minY) {
        minY = y
      }
      if (maxX === undefined || x > maxX) {
        maxX = x
      }
      if (minX === undefined || x < minX) {
        minX = x
      }
    }
  })

  const lineData = data[0]

  const svgWidth = width - xWidth
  const svgHeight = height - 50 - (label ? 36 : 0)
  const ySpread = maxY - minY

  useEffect(() => {
    if (ref.current) {
      updateW(ref.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, maxY)
  const notEnoughData = lineData.length < 2
  const [paths] = notEnoughData
    ? []
    : xWidth || pure
    ? genPath(
        svgWidth,
        svgHeight,
        lineData,
        minY,
        ySpread,
        spread,
        false,
        baseColor
      )
    : [null, []]

  console.log(paths)
  if (pure) {
    return (
      <OverlayWrapper
        isStacked={false}
        legend={false}
        width={svgWidth}
        height={svgHeight}
        labels={labels}
        data={data[0]}
        format={format}
        valueFormat={valueFormat}
        baseColor={baseColor}
      >
        {paths}
      </OverlayWrapper>
    )
  }

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {label ? (
        <Text size="15px" weight={600} space="32px">
          {label}
        </Text>
      ) : null}
      <div
        style={{
          width,
          height: svgHeight,
          display: 'flex',
        }}
      >
        <div
          ref={ref}
          style={{
            marginTop: -32,
            paddingRight: 24,
          }}
        >
          <Labels
            labels={labels}
            labelHeight={labelHeight}
            valueFormat={valueFormat}
          />
        </div>
        <OverlayWrapper
          isStacked={false}
          legend={false}
          width={svgWidth}
          height={svgHeight}
          labelHeight={labelHeight}
          labels={labels}
          data={data[0]}
          format={format}
          valueFormat={valueFormat}
          baseColor={baseColor}
        >
          {paths}
        </OverlayWrapper>
      </div>
      <div
        style={{
          paddingLeft: xWidth + 'px',
        }}
      >
        <XAxis maxX={maxX} minX={minX} format={format} width={svgWidth} />
      </div>
    </div>
  )
}

export default MultilineGraph

import React, { useRef, useEffect, useState } from 'react'
import { Text } from '~'
import genPath from './genPath'
import genLabels from './genLabels'
import XAxis from './XAxis'
import OverlayWrapper from './OverlayWrapper'
import Labels from './Labels'
import { averageOrAddData } from './utils'

const MultiLineGraph = ({
  width,
  height,
  data,
  format,
  label,
  spread,
  valueFormat,
  pure,
  baseColor,
}) => {
  const ref = useRef<any>()
  let maxY, minY
  let maxX, minX

  const [xWidth, updateW] = useState(0)

  data = averageOrAddData(data, width, spread)

  for (let i = 0; i < data.length; i++) {
    const { x, y } = data[i]
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

  const svgWidth = width - xWidth
  const svgHeight = height - 50 - (label ? 36 : 0)
  const ySpread = maxY - minY

  useEffect(() => {
    if (ref.current) {
      updateW(ref.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, maxY)
  const notEnoughData = data.length < 2
  const [paths] = notEnoughData
    ? []
    : xWidth || pure
    ? genPath(
        svgWidth,
        svgHeight,
        data,
        minY,
        ySpread,
        spread,
        false,
        baseColor
      )
    : [null, []]

  if (pure) {
    return (
      <OverlayWrapper
        isStacked={false}
        legend={false}
        width={svgWidth}
        height={svgHeight}
        labels={labels}
        data={data}
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
          data={data}
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

export default MultiLineGraph

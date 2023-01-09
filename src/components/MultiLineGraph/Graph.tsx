import React, { useRef, useEffect, useState } from 'react'
import { Color, Text } from '~'
import { genPath } from './genPath'
import genLabels from './genLabels'
import XAxis from './XAxis'
import OverlayWrapper from './OverlayWrapper'
import Labels from './Labels'
import {
  MultiLineGraphDataInput,
  MultiLineGraphFormat,
  MultiLineGraphData,
} from './types'
import { NumberFormat } from '@based/pretty-number'
import { getMinMax } from './utils'
// import { averageOrAddData } from './utils'

const Graph = ({
  width,
  height,
  data: dataInput,
  format,
  label,
  spread,
  valueFormat,
  pure,
  baseColor,
}: {
  width: number
  height: number
  data: MultiLineGraphDataInput
  format?: MultiLineGraphFormat
  label?: string
  spread: boolean
  valueFormat?: NumberFormat | string
  pure?: boolean
  baseColor: Color
}) => {
  let data: MultiLineGraphData
  if (Array.isArray(dataInput)) {
    data = { '': { data: dataInput } }
  } else if (Array.isArray(dataInput[0])) {
    data = Object.keys(dataInput).reduce(
      (newData, key) => ({ ...newData, [key]: { data: dataInput[key] } }),
      {}
    )
  } else {
    data = dataInput as MultiLineGraphData
  }
  const ref = useRef<any>()
  const [xWidth, updateW] = useState(0)

  // // data = averageOrAddData(data, width, spread)

  const { minX, maxX, minY, maxY } = getMinMax(data)
  console.log({ xWidth })
  const svgWidth = width - xWidth
  const svgHeight = height - (label ? 36 : 0)
  const ySpread = maxY - minY

  useEffect(() => {
    if (ref.current) {
      updateW(ref.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, maxY)
  // const notEnoughData = data.length < 2
  // const [paths] = notEnoughData
  //   ? []
  //   : xWidth || pure
  //   ? genPath(
  //       svgWidth,
  //       svgHeight,
  //       data,
  //       minY,
  //       ySpread,
  //       spread,
  //       false,
  //       baseColor
  //     )
  //   : [null, []]

  let paths = (
    <>
      {Object.keys(data).map((key) =>
        genPath({
          data: data[key].data,
          width: svgWidth,
          height: svgHeight,
          ySpread,
          minY,
          baseColor,
        })
      )}
    </>
  )

  // if (pure) {
  //   return (
  //     <OverlayWrapper
  //       isStacked={false}
  //       legend={false}
  //       width={svgWidth}
  //       height={svgHeight}
  //       labels={labels}
  //       data={data}
  //       format={format}
  //       valueFormat={valueFormat}
  //       baseColor={baseColor}
  //     >
  //       {paths}
  //     </OverlayWrapper>
  //   )
  // }

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
            boxShadow: '0 0 0 1px red',
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

export default Graph

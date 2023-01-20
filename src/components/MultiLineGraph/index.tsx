import React, {
  FunctionComponent,
  createContext,
  useRef,
  useState,
  useEffect,
} from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import { NumberFormat } from '@based/pretty-number'
import {
  MultiLineGraphData,
  MultiLineGraphDataInput,
  MultiLineXGraphFormat,
  Point,
} from './types'
import { averageData, getGlobalMinMax, getMinMax, processData } from './utils'
import genLabels from './genLabels'
import { genPaths } from './genPath'
import XAxis from './XAxis'
import Labels from './Labels'
import { Text } from '~'
import OverlayWrapper from './OverlayWrapper'

const Graph = ({
  width,
  height,
  data: dataInput,
  xFormat,
  label,
  valueFormat,
  pure,
}: {
  width: number
  height: number
  data: MultiLineGraphDataInput
  xFormat?: MultiLineXGraphFormat
  label?: string
  valueFormat?: NumberFormat | string
  pure?: boolean
}) => {
  const labelRef = useRef<any>()
  const [labelWidth, updateLabelWidth] = useState(0)
  const svgWidth = width - labelWidth
  const svgHeight = height - (label ? 66 : 32) + (xFormat ? 0 : 16)

  const data = processData({ dataInput })
  const { globalMaxY, globalMinY, globalMaxX, globalMinX } =
    getGlobalMinMax(data)
  const ySpread = globalMaxY - globalMinY

  // const { minX, maxX, minY, maxY } = getMinMax(data)
  // const ySpread = maxY - minY

  // TODO: Make points here if needed in multiple places
  // Object.keys(data).forEach((key) => {
  //   let stepSize = svgWidth / (data[key].data.length - 1)
  //   const pxValue = ySpread / svgHeight
  //   const targetStepSize = 10

  //   // TODO: this needs to be done before min max
  //   if (stepSize < targetStepSize) {
  //     const { data: newData, stepSize: newStepSize } = averageData({
  //       data: data[key].data,
  //       stepSize,
  //       width: svgWidth,
  //       targetStepSize,
  //     })
  //     data[key].data = newData
  //     stepSize = newStepSize
  //   }
  //   data[key].points = data[key].data.map((dataItem, index) => {
  //     return {
  //       x: stepSize * index,
  //       y: (ySpread - (dataItem.y - globalMinY)) / pxValue,
  //     }
  //   })
  // })

  useEffect(() => {
    if (labelRef.current) {
      updateLabelWidth(labelRef.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  let { paths, lineRefs } = genPaths({
    data: data,
    width: svgWidth,
    height: svgHeight,
  })

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, globalMaxY)
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
        <Text size="15px" weight={600} space="8px">
          {label}
        </Text>
      ) : null}
      <div
        style={{
          width,
          height: svgHeight,
          display: 'flex',
          paddingTop: 12,
        }}
      >
        <div
          ref={labelRef}
          style={{
            // boxShadow: '0 0 0 1px red',
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
          valueFormat={valueFormat}
          ySpread={ySpread}
          lineRefs={lineRefs}
          xFormat={xFormat}
        >
          {paths}
        </OverlayWrapper>
      </div>
      {xFormat ? (
        <div
          style={{
            paddingLeft: labelWidth + 'px',
          }}
        >
          <XAxis
            maxX={globalMaxX}
            minX={globalMinX}
            xFormat={xFormat}
            width={svgWidth}
          />
        </div>
      ) : null}
    </div>
  )
}

export type MultiLineGraphProps = {
  data: MultiLineGraphDataInput
  xFormat?: MultiLineXGraphFormat
  valueFormat?: NumberFormat | string
  pure?: boolean
  label?: string
}
export const MultiLineGraph: FunctionComponent<MultiLineGraphProps> = ({
  data,
  label,
  xFormat = 'number',
  valueFormat = 'number-short',
  pure,
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Graph
            label={label}
            data={data}
            height={height}
            width={width}
            pure={pure}
            xFormat={xFormat}
            valueFormat={valueFormat}
          />
        )
      }}
    </AutoSizer>
  )
}

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
  MultiLineGraphFormat,
} from './types'
import { getMinMax } from './utils'
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
  format,
  label,
  valueFormat,
  pure,
}: {
  width: number
  height: number
  data: MultiLineGraphDataInput
  format?: MultiLineGraphFormat
  label?: string
  valueFormat?: NumberFormat | string
  pure?: boolean
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
  const labelRef = useRef<any>()
  const [labelWidth, updateLabelWidth] = useState(0)

  const { minX, maxX, minY, maxY } = getMinMax(data)
  const svgWidth = width - labelWidth
  const svgHeight = height - (label ? 66 : 32) + (format ? 0 : 16)
  const ySpread = maxY - minY

  // TODO: Make points here if needed in multiple places
  Object.keys(data).forEach((key) => {
    const stepSize = svgWidth / (data[key].data.length - 1)
    const pxValue = ySpread / svgHeight
    data[key].points = data[key].data.map((dataItem, index) => {
      return {
        x: stepSize * index,
        y: (ySpread - (dataItem.y - minY)) / pxValue,
      }
    })
  })

  useEffect(() => {
    if (labelRef.current) {
      updateLabelWidth(labelRef.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, maxY)

  let { paths, lineRefs } = genPaths({
    data: data,
    width: svgWidth,
    height: svgHeight,
    ySpread,
    minY,
  })

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
          format={format}
          valueFormat={valueFormat}
          ySpread={ySpread}
          lineRefs={lineRefs}
        >
          {paths}
        </OverlayWrapper>
      </div>
      {format ? (
        <div
          style={{
            paddingLeft: labelWidth + 'px',
          }}
        >
          <XAxis maxX={maxX} minX={minX} format={format} width={svgWidth} />
        </div>
      ) : null}
    </div>
  )
}

export type MultiLineGraphProps = {
  data: MultiLineGraphDataInput
  format?: MultiLineGraphFormat
  valueFormat?: NumberFormat | string
  pure?: boolean
  label?: string
}
export const MultiLineGraph: FunctionComponent<MultiLineGraphProps> = ({
  data,
  label,
  format = 'number',
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
            format={format}
            valueFormat={valueFormat}
          />
        )
      }}
    </AutoSizer>
  )
}

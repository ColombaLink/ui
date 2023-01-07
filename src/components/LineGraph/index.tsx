import React, { FunctionComponent, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'
import StackedGraph from './StackedGraph'

import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { Color } from '~/types'
import { DataItem } from './types'
import MultilineGraph from './MultilineGraph'

type Ctx = { hover?: (key: string) => void }

const defCtx: Ctx = {
  hover: () => {},
}

export const GraphContext = createContext(defCtx)

GraphContext.displayName = 'GraphContext'

export type LineGraphProps = {
  data: { [key: string]: DataItem[] } | DataItem[]
  legend?: { [key: string]: string }
  format?: 'date' | 'number' | 'date-time-human' | NumberFormat | DateFormat
  valueFormat?: NumberFormat | string
  spread?: boolean
  pure?: boolean
  label?: string
  color?: Color
}

// multi line

export const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  spread = true,
  format = 'number',
  valueFormat = 'number-short',
  legend,
  pure,
  color: colorProp = 'accent',
}) => {
  const isStacked = data && typeof data === 'object' && !Array.isArray(data)

  return (
    <AutoSizer>
      {({ height, width }) => {
        return isStacked ? (
          <GraphContext.Provider value={{}}>
            <StackedGraph
              format={format}
              spread={spread}
              label={label}
              legend={legend}
              data={data}
              height={height}
              width={width}
              valueFormat={valueFormat}
              baseColor={colorProp}
            />
          </GraphContext.Provider>
        ) : (
          <Graph
            format={format}
            spread={spread}
            label={label}
            data={data}
            height={height}
            width={width}
            valueFormat={valueFormat}
            pure={pure}
            baseColor={colorProp}
          />
        )
      }}
    </AutoSizer>
  )
}

export type MultiLineGraphProps = Omit<LineGraphProps, 'data'> & {
  // data: { [key: string]: Data }[] | Data[]
  data: DataItem[][]
}

export const MultiLineGraph: FunctionComponent<MultiLineGraphProps> = ({
  data,
  label,
  spread = true,
  format = 'number',
  valueFormat = 'number-short',
  legend,
  pure,
  color: colorProp = 'accent',
}) => {
  const isStacked = data && typeof data === 'object' && !Array.isArray(data)

  return (
    <AutoSizer>
      {({ height, width }) => (
        // return isStacked ? (
        //   <GraphContext.Provider value={{}}>
        //     <StackedGraph
        //       format={format}
        //       spread={spread}
        //       label={label}
        //       legend={legend}
        //       data={data}
        //       height={height}
        //       width={width}
        //       valueFormat={valueFormat}
        //       baseColor={colorProp}
        //     />
        //   </GraphContext.Provider>
        // ) : (
        <MultilineGraph
          format={format}
          spread={spread}
          label={label}
          data={data}
          height={height}
          width={width}
          valueFormat={valueFormat}
          pure={pure}
          baseColor={colorProp}
        />
      )}
    </AutoSizer>
  )
}

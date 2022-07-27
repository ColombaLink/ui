import React, { FunctionComponent, createContext, FC } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'
import StackedGraph from './StackedGraph'

import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { DateFormat, prettyDate } from '@based/pretty-date'

type Data = { x: number; y: number }[]

type Ctx = { hover?: (key: string) => void }

const defCtx: Ctx = {
  hover: (a) => {},
}

export const GraphContext = createContext(defCtx)

GraphContext.displayName = 'GraphContext'

export type LineGraphProps = {
  data: { [key: string]: Data } | Data
  legend?: { [key: string]: string }
  format?: 'date' | 'number' | 'date-time-human' | NumberFormat | DateFormat
  valueFormat?: NumberFormat | string
  spread?: boolean
  pure?: boolean
  label?: string
  width?: number
  height?: number
}

// multi line

const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  spread = true,
  format = 'number',
  valueFormat = 'number-short',
  legend,
  pure,
  width = 760,
  height = 340,
}) => {
  const isStacked = data && typeof data === 'object' && !Array.isArray(data)

  return (
    <div>
      {/* <AutoSizer> */}
      {/* {({ height, width }) => { */}
      {isStacked ? (
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
        />
      )}
      {/* }} */}
      {/* </AutoSizer> */}
    </div>
  )
}

export { LineGraph }

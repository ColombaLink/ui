import React, { FunctionComponent, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'
import StackedGraph from './StackedGraph'

import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { Color } from '~/types'

type Data = { x: number; y: number }[]

type Ctx = { hover?: (key: string) => void }

const defCtx: Ctx = {
  hover: () => {},
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
  baseColor?: Color
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
  baseColor,
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
              baseColor={baseColor}
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
            baseColor={baseColor}
          />
        )
      }}
    </AutoSizer>
  )
}

export { LineGraph }

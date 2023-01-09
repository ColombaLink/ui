import React, { FunctionComponent, createContext } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import Graph from './Graph'

import { NumberFormat } from '@based/pretty-number'
import { DateFormat } from '@based/pretty-date'
import { Color } from '~/types'
import { MultiLineGraphDataInput, MultiLineGraphFormat } from './types'

type Ctx = { hover?: (key: string) => void }

const defCtx: Ctx = {
  hover: () => {},
}

export const GraphContext = createContext(defCtx)

GraphContext.displayName = 'GraphContext'

export type MultiLineGraphProps = {
  data: MultiLineGraphDataInput
  legend?: { [key: string]: string }
  format?: MultiLineGraphFormat
  valueFormat?: NumberFormat | string
  spread?: boolean
  pure?: boolean
  label?: string
  color?: Color
}

// multi line

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
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
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

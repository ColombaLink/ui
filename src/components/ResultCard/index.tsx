import React, { FC, CSSProperties } from 'react'
import { Text } from '../Text'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

type ResultCardProps = {
  label?: string
  value?: number | { [key: string]: number | string }
  style?: CSSProperties
  format?: NumberFormat
  space?: Space
}

export const ResultCard: FC<ResultCardProps> = ({
  label = 'Total Responses',
  format = 'number-short',
  value = '-',
  space,
  style,
  ...props
}) => {
  if (typeof value === 'object') {
    // @ts-ignore
    format = value.format
    value = value.value
  }

  return (
    <div
      style={{
        width: 212,
        height: 116,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: color('background2dp'),
        border: `1px solid ${color('border')}`,
        borderRadius: 4,
        margin: spaceToPx(space),
        ...style,
      }}
      {...props}
    >
      <Text typography="body400" space="8px">
        {label}
      </Text>

      <Text typography="title2">{prettyNumber(value, format)}</Text>
    </div>
  )
}

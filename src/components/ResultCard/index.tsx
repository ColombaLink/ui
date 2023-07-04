import React, { FC, CSSProperties, useEffect } from 'react'
import { Text } from '../Text'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { DateFormat, prettyDate } from '@based/pretty-date'
import { useUpdate } from '~/hooks'

type ResultCardProps = {
  label?: string
  value?: number | { [key: string]: number | string }
  style?: CSSProperties
  format?: NumberFormat | DateFormat | 'time-seconds' | 'countdown-seconds'
  space?: Space
}

export const ResultCard: FC<ResultCardProps> = ({
  label = 'Total',
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

  const update = useUpdate()

  useEffect(() => {
    if (format === 'date-time-human' || format === 'countdown-seconds') {
      const interval = setInterval(() => {
        update()
      }, 1e3)
      return () => {
        clearInterval(interval)
      }
    }
  }, [format])

  const formatted =
    format === 'countdown-seconds'
      ? !isNaN(Number(value))
        ? Math.max(0, Math.round((Number(value) - Date.now()) / 1e3)) + 's'
        : '-'
      : format === 'time-seconds'
      ? !isNaN(Number(value))
        ? Math.round(Number(value) / 1e3) + 's'
        : '-'
      : format.startsWith('number-')
      ? // @ts-ignore
        prettyNumber(value, format)
      : format.startsWith('date-') || format.startsWith('time-')
      ? // @ts-ignore
        prettyDate(value, format)
      : value

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

      <Text typography="title2">{formatted}</Text>
    </div>
  )
}

import React, { FC } from 'react'
import { color } from '~/utils'
import { Text } from '~'
import { useHover } from '~/hooks'

type BarGraphProps = {
  data: { value: number | { [key: string]: number }; label: string }[]
  label?: string
  value?: number
}

export const BarGraph: FC<BarGraphProps> = ({ data, label, value }) => {
  console.log(data)

  // @ts-ignore
  const total = Object.values(data).reduce((t, { value }) => t + value, 0)
  console.log('total', total)

  // get highest value
  // @ts-ignore
  const highestVal = Math.max(...data.map((item) => item.value))
  console.log('highest', highestVal)

  // get lowest value
  // @ts-ignore
  const lowestVal = Math.min(...data.map((item) => item.value))

  //normalize data to fit in the graph 100% width is highest value
  // @ts-ignore
  const normalizedData = data.map((item) => (+item.value / highestVal) * 100)
  console.log('normalizedData', normalizedData)

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', width: '100%', alignItems: 'center' }}
          >
            {item.label || value ? (
              <div style={{ minWidth: 200, paddingRight: 24 }}>
                <Text weight={400}>{item.label}</Text>
              </div>
            ) : null}
            <div
              style={{
                width: '100%',
                height: 32,
                borderRadius: 4,
                backgroundColor: color('border'),
                position: 'relative',
                display: 'flex',
                margin: '4px auto',
              }}
            >
              <div
                style={{
                  width: `${normalizedData[idx]}%`,
                  height: 32,
                  borderRadius: 4,
                  backgroundColor: color('accent'),
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                }}
              >
                <Text color="accent:contrast" style={{ marginRight: 4 }}>
                  {item.value}
                </Text>
                <Text color="accent:contrast">
                  ({(+item.value / (total / 100)).toFixed(1)}%)
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

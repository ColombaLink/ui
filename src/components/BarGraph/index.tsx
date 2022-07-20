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

  let total,
    highestVal,
    lowestVal,
    normalizedData,
    totalPerObject,
    normalizedDataPerObject

  //test if value is an object or number
  if (typeof data[0].value === 'object') {
    //  console.log('yes is object', data[0].value)
    // @ts-ignore
    totalPerObject = data.map((item) =>
      Object.values(item.value).reduce((t, value) => t + value, 0)
    )
    highestVal = Math.max(...totalPerObject)
    normalizedData = totalPerObject.map((item) => (item / highestVal) * 100)

    // totalPerObject[idx]
    normalizedDataPerObject = data.map((item, idx) =>
      Object.values(item.value).map((value) =>
        (+(value / totalPerObject[idx]) * 100).toFixed(1)
      )
    )

    //  console.log('Highest val', highestVal)
    console.log('totalPerObject', totalPerObject)
    console.log('normalized Data Per Object', normalizedDataPerObject)
    //  console.log('normalizedData over alle objecten', normalizedData)
  } else if (
    typeof data[0].value === 'number' ||
    typeof data[0].value === 'string'
  ) {
    // if the value is a single number (key pair)
    // @ts-ignore
    total = Object.values(data).reduce((t, { value }) => t + value, 0)
    // @ts-ignore
    highestVal = Math.max(...data.map((item) => item.value))
    // @ts-ignore
    lowestVal = Math.min(...data.map((item) => item.value))
    normalizedData = data.map((item) => (+item.value / highestVal) * 100)
  }

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
              {/* parent wrapper bar */}
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
                {typeof item.value !== 'object' && (
                  <Text color="accent:contrast" style={{ marginRight: 4 }}>
                    {item.value}
                  </Text>
                )}
                <Text color="accent:contrast">
                  ({normalizedData[idx].toFixed(1) + '%'})
                  {/* ({(+item.value / (total / 100)).toFixed(1)}%) */}
                </Text>

                {/* // bar segments */}
                {typeof item.value === 'object' &&
                  normalizedDataPerObject[idx].map((item) => <div>{item}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const barSegment = (width) => {
  return (
    <div
      style={{
        height: 32,
        width: width,
        backgroundColor: 'lightblue',
      }}
    >
      Snurp
    </div>
  )
}

//   // @ts-ignore
//   const total = Object.values(data).reduce((t, { value }) => t + value, 0)
//   console.log('total', total)

//   // get highest value
//   // @ts-ignore
//   const highestVal = Math.max(...data.map((item) => item.value))
//   console.log('highest', highestVal)

//   // get lowest value
//   // @ts-ignore
//   const lowestVal = Math.min(...data.map((item) => item.value))

//   //normalize data to fit in the graph 100% width is highest value
//   // @ts-ignore
//   const normalizedData = data.map((item) => (+item.value / highestVal) * 100)
//   console.log('normalizedData', normalizedData)

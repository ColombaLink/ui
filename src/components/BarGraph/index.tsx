import React, { CSSProperties, FC } from 'react'
import { color } from '~/utils'
import { Text } from '~'
import { useHover } from '~/hooks'
import { styled } from 'inlines'
import { parseNumber } from '~/utils'

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

    console.log('Highest val', highestVal)
    console.log('totalPerObject', totalPerObject)
    console.log('normalized Data Per Object', normalizedDataPerObject)
    console.log('normalizedData over alle objecten', normalizedData)
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
                  backgroundColor:
                    typeof item.value !== 'object'
                      ? color('accent')
                      : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  position: 'relative',
                }}
              >
                {typeof item.value !== 'object' && (
                  <Text color="accent:contrast" style={{ marginRight: 4 }}>
                    {parseNumber(item.value, 'number-short')} (
                    {normalizedData[idx].toFixed(1) + '%'})
                  </Text>
                )}

                {typeof item.value === 'object' && (
                  <div
                    style={{ position: 'relative', display: 'flex', zIndex: 1 }}
                  >
                    <Text color="accent:contrast">
                      {parseNumber(totalPerObject[idx], 'number-short')} (
                      {normalizedData[idx].toFixed(1) + '%'})
                      {/* ({(+item.value / (total / 100)).toFixed(1)}%) */}
                    </Text>
                  </div>
                )}

                {/* // bar segments */}
                {typeof item.value === 'object' && (
                  <styled.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      display: 'flex',
                      width: '100%',
                      '& > div:first-child': {
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                      },
                      '& > div:last-child': {
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                      },
                    }}
                  >
                    {normalizedDataPerObject[idx].map((item, key) => (
                      <BarSegment key={key} id={key} width={item} />
                    ))}
                  </styled.div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

type BarSegmentProps = {
  id: number
  width: number
  style?: CSSProperties
  key?: number
}

export const BarSegment: FC<BarSegmentProps> = ({ width, key, style, id }) => {
  {
    console.log('Key', id)
  }
  return (
    <styled.div
      style={{
        height: 32,
        display: 'block',
        width: width + '%',
        backgroundColor: color('accent'),
        opacity: `calc(1 - 0.${id * 2})`,
        ...style,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      {/* {width} */}
    </styled.div>
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

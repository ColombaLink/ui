import React, { FC, CSSProperties, Fragment, useState } from 'react'
import { color, spaceToPx } from '~/utils'
import { Text } from '~'
import { useToolTips } from '~/hooks'
import { styled } from 'inlines'
import { prettyNumber } from '@based/pretty-number'
import { Space } from '~/types'

type PieGraphProps = {
  data: { value: number | { [key: string]: number }; label: string }[]
  label?: string
  value?: number
  legend?: { [key: string]: string } | string[]
  style?: CSSProperties
  size?: number
  space?: Space
}

export const PieGraph: FC<PieGraphProps> = ({
  data,
  label,
  value,
  legend = null,
  style,
  space,
  size = 280,
}) => {
  let total,
    highestVal,
    normalizedData,
    totalPerObject,
    normalizedDataPerObject,
    subValuesPerObject,
    legendValues,
    legendKeys,
    subLabelsPerObject,
    percentagePerObject

  let tempCounter = 0

  //test if value is an object or number
  if (typeof data[0].value === 'object') {
    subValuesPerObject = data.map((item) => Object.values(item.value))
    subLabelsPerObject = data.map((item) => Object.keys(item.value))
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
    normalizedData = data.map((item) => (+item.value / highestVal) * 100)

    percentagePerObject = data.map((item, idx) => (item.value / total) * 100)

    // console.log('Total', total)
    // console.log('Highest', highestVal)
    // console.log('Normalized', normalizedData)
    // console.log('percentage per object', percentagePerObject)
  }

  // little legend check
  if (legend && typeof legend === 'object') {
    legendValues = Object.values(legend)
    legendKeys = Object.keys(legend)
  } else if (legend && Array.isArray(legend)) {
    legendValues = legend
  } else {
    legendValues = undefined
  }

  const percentageToDegrees = (percentage: number) => {
    return (percentage * 360) / 100
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          width: size,
          height: size,
          marginBottom: spaceToPx(space),
        }}
      >
        {/* map and reduce  counter for percentage to degrees*/}
        {data.map((item, idx) => (
          <Fragment key={idx}>
            <div
              key={idx}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: size / 2,
                background: ` conic-gradient(${color(
                  'accent:hover'
                )} calc(${percentagePerObject[idx].toFixed()}*1%),#0000 0)`,
                transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                opacity: `calc(1 - 0.${idx * 2})`,
              }}
            ></div>

            <span style={{ display: 'none' }}>
              {(tempCounter += +percentagePerObject[idx].toFixed())}
            </span>
            {console.log(tempCounter)}
          </Fragment>
        ))}
      </div>

      {/* info label legend optional */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                background: color('accent'),
                opacity: `calc(1 - 0.${idx * 2})`,
                marginRight: 12,
                border: '1px solid black',
              }}
            ></div>
            <Text>
              {item.label} - {prettyNumber(item.value, 'number-short')} (
              {percentagePerObject[idx].toFixed(0) + '%'})
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}

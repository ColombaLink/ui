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
    totalPercentagesPerObject,
    percentagePerObject,
    totalSubValuesPerObject

  let tempCounter = 0
  let subTempCounter = 0
  let subPercentages = []

  let themeColorArray = [
    color('accent'),
    color('green'),
    color('red'),
    color('babyblue'),
    color('yellow'),
  ]

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

    total = totalPerObject.reduce((t, value) => t + value, 0)

    totalPercentagesPerObject = totalPerObject.map(
      (item, idx) => +((item / total) * 100)
    )

    for (let i = 0; i < subValuesPerObject.length; i++) {
      for (let j = 0; j < subValuesPerObject[i].length; j++) {
        subPercentages.push(+((subValuesPerObject[i][j] / total) * 100))
      }
    }

    console.log(subValuesPerObject.length)

    console.log('total', total)
    console.log('total per object', totalPerObject)
    console.log('subvaluesperobject', subValuesPerObject)
    console.log('sub label per object', subLabelsPerObject)
    console.log('highest val', highestVal)
    console.log('normalized data', normalizedData)
    console.log('normalized data per object', normalizedDataPerObject)
    console.log('supPercentages', subPercentages)
    console.log('total percentages per object', totalPercentagesPerObject)
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
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {/* als het geen object is */}
      {typeof data[0].value !== 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: spaceToPx(space),
          }}
        >
          {/* map and reduce  counter for percentage to degrees*/}
          {/* if data value is not another object */}

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
            </Fragment>
          ))}
        </div>
      )}

      {/* als het wel een object is */}
      {typeof data[0].value === 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: spaceToPx(space),
          }}
        >
          {/* map and reduce  counter for percentage to degrees*/}
          {/* if data value is not another object */}

          {data.map((item, index) => (
            <Fragment key={index}>
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: ` conic-gradient(${themeColorArray[index]} calc(${totalPercentagesPerObject[index]}*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                  opacity: `1`,
                }}
              ></div>

              <span style={{ display: 'none' }}>
                {(tempCounter += +totalPercentagesPerObject[index])}
              </span>
              {console.log(tempCounter)}
            </Fragment>
          ))}

          {/* sub values per object  */}
          {subPercentages.map((value, idx) => (
            <Fragment key={idx}>
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: ` conic-gradient(${'rgba(255,255,255,0.5)'} calc(${
                    subPercentages[idx]
                  }*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(
                    subTempCounter
                  )}deg)`,
                  opacity: `calc(1 - 0.${idx * 1})`,
                }}
              ></div>
              <span style={{ display: 'none' }}>
                {(subTempCounter += +subPercentages[idx])}
              </span>
              {console.log(subTempCounter)}
            </Fragment>
          ))}
        </div>
      )}

      {/* legenda if you want */}

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
                background:
                  typeof data[0].value !== 'object'
                    ? color('accent')
                    : themeColorArray[idx],
                opacity: `calc(1 - 0.${idx * 2})`,
                marginRight: 12,
                border: `1px solid ${color('border')}`,
              }}
            ></div>
            {typeof data[0].value !== 'object' && (
              <Text>
                {item.label} - {prettyNumber(item.value, 'number-short')} (
                {percentagePerObject[idx].toFixed(0) + '%'})
              </Text>
            )}
            {typeof data[0].value === 'object' && (
              <Text>
                {item.label} - (
                {totalPercentagesPerObject[idx].toFixed(0) + '%'})
              </Text>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// const pieSegment = () => {
//   return <div>blah</div>
// }

import React, { FC, CSSProperties, Fragment, useState, useRef } from 'react'
import { color, spaceToPx } from '~/utils'
import { Text } from '~'

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
    normalizedDataPerObject,
    totalPerObject,
    subValuesPerObject,
    legendValues,
    legendKeys,
    subLabelsPerObject,
    totalPercentagesPerObject,
    percentagePerObject,
    totalSubValuesPerObject,
    anglePercentages

  let tempCounter = 0
  let subTempCounter = 0
  let subPercentages = []
  let anglePercentageCounter = 0
  let angleAddedPercentages = []
  let allLabelsInRowArray = []

  let themeColorArray = [
    'pink',
    'grey',
    'yellow',
    'red',
    'blue',
    'black',
    'green',
    'purple',
    'orange',
    'brown',
    'lightblue',
    'lightgreen',
    'lightpurple',
  ]

  const [toolTipIndex, setToolTipIndex] = useState(0)
  const [showMouseLabel, setShowMouseLabel] = useState(false)

  const mouseLabel = useRef<HTMLDivElement>(null)

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

    anglePercentages = subPercentages.map((item, i) => (+item / 100) * 360)

    for (let i = 0; i < anglePercentages.length; i++) {
      anglePercentageCounter += anglePercentages[i]
      angleAddedPercentages.push(anglePercentageCounter)
    }

    //all labels array
    for (let i = 0; i < totalPercentagesPerObject.length; i++) {
      for (let j = 0; j < subLabelsPerObject[i].length; j++) {
        allLabelsInRowArray.push(subLabelsPerObject[i][j])
      }
    }

    // // console.log('total', total)
    // // console.log('total per object', totalPerObject)
    //  console.log('subvaluesperobject', subValuesPerObject)
    // console.log('sub label per object', subLabelsPerObject)
    // console.log('All labels in row', allLabelsInRowArray)
    // // console.log('highest val', highestVal)
    // // console.log('normalized data', normalizedData)
    //  console.log('normalized data per object', normalizedDataPerObject)
    // console.log('supPercentages', subPercentages)
    console.log('total percentages per object', totalPercentagesPerObject)
    console.log('angle percentages', anglePercentages)

    // //kijk welke angle hier binnen valt
    console.log('angle added percentages', angleAddedPercentages)
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
    // @ts-ignore
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

  const toConicGradientValues = (arr) => {
    let str

    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        str = `red ${arr[i].toFixed(2)}deg ,`
      } else if (i === arr.length - 1) {
        str += `yellow ${arr[i].toFixed(2)}deg`
      } else {
        str += `${themeColorArray[i]} ${arr[i - 1]}deg ${arr[i]}deg ,`
      }
    }

    return str
  }

  ;`red 36deg, orange 36deg 170deg, yellow 170deg)`

  console.log(toConicGradientValues(angleAddedPercentages))

  const percentageToDegrees = (percentage: number) => {
    return (percentage * 360) / 100
  }

  const lastIndex = (arr, predicate) =>
    arr.map((item) => predicate(item)).lastIndexOf(true) + 1

  const mousePositionHandler = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.pageX - rect.left
    const y = e.pageY - rect.top
    const centerPoint = rect.width / 2
    const radians = Math.atan2(x - centerPoint, y - centerPoint)
    const flippedAngle = radians * (180 / Math.PI) + 180
    const angle = 360 - flippedAngle

    const indexOfAngle = lastIndex(
      angleAddedPercentages,
      (item) => item < angle
    )

    setToolTipIndex(indexOfAngle)

    if (showMouseLabel) {
      mouseLabel.current.style.left = `${x + 12}px`
      mouseLabel.current.style.top = `${y - 24}px`
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      onMouseLeave={() => {
        setShowMouseLabel(false)
      }}
      onMouseEnter={() => {
        setShowMouseLabel(true)
      }}
    >
      {/* als het geen object is */}
      {typeof data[0].value !== 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: spaceToPx(space),
            borderRadius: '50%',
            overflow: 'hidden',
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
          onPointerMove={(e) => mousePositionHandler(e)}
        >
          {/* /* map and reduce  counter for percentage to degrees* */}
          <div
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              background: `conic-gradient(${toConicGradientValues(
                angleAddedPercentages
              )})`,
              //  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
              opacity: `1`,
            }}
          ></div>

          {/* {data.map((item, index) => (
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
            </Fragment>
          ))} */}
          {/* sub values per object  */}
          {/* {subPercentages.map((value, idx) => (
            <Fragment key={idx}>
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: `conic-gradient(${'rgba(255,255,255,0.33)'} calc(${
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
            </Fragment>
          ))} */}
          {showMouseLabel ? (
            <div
              ref={mouseLabel}
              style={{
                position: 'absolute',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: '#fff',
                boxShadow: 'rgb(0 0 0 / 12%) 0px 4px 10px',
                border: `1px solid ${color('border')}`,
              }}
            >
              {allLabelsInRowArray[toolTipIndex] +
                ' - ' +
                subPercentages[toolTipIndex].toFixed(1) +
                '%'}
            </div>
          ) : null}
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
                opacity: `calc(1.2 - 0.${idx * 2})`,
                marginRight: 12,
                border: `1px solid ${color('border')}`,
              }}
            ></div>
            {typeof data[0].value !== 'object' && (
              <Text>
                {/* @ts-ignore */}
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

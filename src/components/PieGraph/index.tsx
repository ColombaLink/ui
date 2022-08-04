import React, { FC, CSSProperties, Fragment, useState, useRef } from 'react'
import { color, spaceToPx } from '~/utils'
import { Text } from '~'
import { prettyNumber } from '@based/pretty-number'
import { Color, Space } from '~/types'
import { styled } from 'inlines'

type PieGraphProps = {
  data: {
    value: number | { [key: string]: number }
    label: string
    color?: string
  }[]
  label?: string
  value?: number
  legend?: { [key: string]: string } | string[]
  style?: CSSProperties
  size?: number
  space?: Space
  baseColor?: Color
}

export const PieGraph: FC<PieGraphProps> = ({
  data,
  label,
  value,
  legend = null,
  style,
  baseColor,
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
  let newColorArr = []

  let themeColorArray = [
    'rgba(61, 83, 231,1)',
    'rgba(89,196,197,1)',
    'rgba(154,82,246,1)',
    'rgba(244,67,54,1)',
    'rgba(86,187,112,1)',
    'rgba(255,0,0,1)',
    'rgba(0,255,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,255,0,1)',
    'rgba(255,0,255,1)',
    'rgba(0,255,255,1)',
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

    console.log(subValuesPerObject)

    const newColorArrayFun = () => {
      for (let i = 0; i < totalPerObject.length; i++) {
        for (let j = 0; j < subValuesPerObject[0].length; j++) {
          newColorArr.push(
            themeColorArray[i].slice(0, -2).concat(`${1 - 0.1 * j})`)
          )
        }
      }
    }
    newColorArrayFun()

    console.log('new color Arr', newColorArr)

    console.log(totalPerObject.length)
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

    console.log(toolTipIndex)

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
                  background: baseColor
                    ? `conic-gradient(${color(
                        baseColor
                      )} calc(${percentagePerObject[
                        idx
                      ].toFixed()}*1%),#0000 0)`
                    : `conic-gradient(${color(
                        'accent'
                      )} calc(${percentagePerObject[
                        idx
                      ].toFixed()}*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                  opacity: `calc(1 - 0.${idx * 1})`,
                }}
              ></div>

              <span style={{ display: 'none' }}>
                {(tempCounter += +percentagePerObject[idx].toFixed())}
              </span>
            </Fragment>
          ))}
        </div>
      )}

      {/****************************  als het wel een object is *****************************/}

      {typeof data[0].value === 'object' && (
        <div
          style={{
            width: size,
            height: size,
            marginBottom: spaceToPx(space),
          }}
          onPointerMove={(e) => mousePositionHandler(e)}
        >
          {data.map((item, index) => (
            <Fragment key={index}>
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  // background: ` conic-gradient(${themeColorArray[index]} calc(${totalPercentagesPerObject[index]}*1%),#0000 0)`,
                  // background: ` conic-gradient(white calc(${totalPercentagesPerObject[index]}*1%),#0000 0)`,
                  background: 'transparent',
                  transform: `rotate(${percentageToDegrees(tempCounter)}deg)`,
                  opacity: `1`,
                }}
              ></div>

              <span style={{ display: 'none' }}>
                {(tempCounter += +totalPercentagesPerObject[index])}
              </span>
            </Fragment>
          ))}
          {/* sub values per object  */}
          {subPercentages.map((value, idx) => (
            <Fragment key={idx}>
              <styled.div
                key={idx}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: `conic-gradient(${newColorArr[idx]} calc(${subPercentages[idx]}*1%),#0000 0)`,
                  transform: `rotate(${percentageToDegrees(
                    subTempCounter
                  )}deg)`,
                  opacity: idx === toolTipIndex ? '0.75' : '1',
                }}
              ></styled.div>
              <span style={{ display: 'none' }}>
                {(subTempCounter += +subPercentages[idx])}
              </span>
            </Fragment>
          ))}
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

      {/*************************  legenda if you want **************/}

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
                    ? baseColor
                      ? color(baseColor)
                      : color('accent')
                    : themeColorArray[idx],
                opacity:
                  typeof data[0].value !== 'object'
                    ? `calc(1 - 0.${idx * 1})`
                    : '1',
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

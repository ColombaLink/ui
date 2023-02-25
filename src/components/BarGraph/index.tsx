import React, { CSSProperties, FC, ReactNode } from 'react'
import { Color, color } from '~/utils'
import { Text, Label } from '~'
import { useTooltip } from '~/hooks'
import { styled } from 'inlines'
import { prettyNumber } from '@based/pretty-number'

type BarGraphProps = {
  data: {
    value: number | { [key: string]: number }
    label: string
    color?: string
  }[]
  label?: string
  description?: string
  value?: number
  legend?: { [key: string]: string } | string[]
  style?: CSSProperties
  color?: Color
  scale?: number
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  label,
  description,
  value,
  legend = null,
  style,
  color: colorProp = 'accent',
  scale,
}) => {
  if (!data) {
    return null
  }

  let highestVal,
    normalizedData,
    totalPerObject,
    normalizedDataPerObject,
    subValuesPerObject,
    legendValues,
    subLabelsPerObject

  if (typeof data[0].value === 'object') {
    subValuesPerObject = data.map((item) => Object.values(item.value))
    subLabelsPerObject = data.map((item) => Object.keys(item.value))

    totalPerObject = data.map((item) =>
      Object.values(item.value).reduce((t, value) => t + value, 0)
    )
    scale ? (highestVal = scale) : (highestVal = Math.max(...totalPerObject))
    normalizedData = totalPerObject.map((item) => (item / highestVal) * 100)

    normalizedDataPerObject = data.map((item, idx) =>
      Object.values(item.value).map((value) =>
        (+(value / totalPerObject[idx]) * 100).toFixed(1)
      )
    )
  } else if (
    typeof data[0].value === 'number' ||
    typeof data[0].value === 'string'
  ) {
    scale
      ? (highestVal = scale)
      : (highestVal = Math.max(...data.map((item) => +item.value)))

    normalizedData = data.map((item) => (+item.value / highestVal) * 100)
  }

  // little legend check
  if (legend && typeof legend === 'object') {
    legendValues = Object.values(legend)
  } else if (legend && Array.isArray(legend)) {
    legendValues = legend
  } else {
    legendValues = undefined
  }

  const themeColorArray = []

  for (let i = 0; i < data.length; i++) {
    if (colorProp) {
      themeColorArray.push(color(colorProp))
    } else {
      themeColorArray.push(color('accent'))
    }
  }

  const hexToRgba = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  // check if there are sub label colors:
  for (let i = 0; i < data.length; i++) {
    if (data[i].color) {
      if (data[i].color.includes('#')) {
        // convert to rgba and then push
        themeColorArray[i] = hexToRgba(data[i].color)
      }
    }
  }

  return (
    <>
      <Label label={label} description={description} space />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          ...style,
        }}
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{ display: 'flex', width: '100%', alignItems: 'center' }}
          >
            {item.label || value ? (
              <div style={{ minWidth: 200, paddingRight: 24 }}>
                <Text>{item.label}</Text>
              </div>
            ) : null}
            <div
              style={{
                width: '100%',
                height: 32,
                borderRadius: 4,
                // backgroundColor: color('border'),
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
                      ? colorProp
                        ? color(colorProp)
                        : color('accent')
                      : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  position: 'relative',
                }}
              >
                {typeof item.value !== 'object' && (
                  <Text color="accent:contrast" style={{ marginRight: 4 }}>
                    {prettyNumber(item.value, 'number-short')} (
                    {normalizedData[idx].toFixed(1) + '%'})
                  </Text>
                )}

                {typeof item.value === 'object' && (
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    <Text color="accent:contrast">
                      {prettyNumber(totalPerObject[idx], 'number-short')} (
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
                      <BarSegment
                        key={key}
                        id={key}
                        width={item}
                        legend={legendValues && legendValues[key]}
                        value={prettyNumber(
                          subValuesPerObject[idx][key],
                          'number-short'
                        )}
                        label={subLabelsPerObject[idx][key]}
                        bgColor={themeColorArray[idx]}
                      />
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
  id: number | string
  width: number
  value: string | number
  style?: CSSProperties
  label?: string
  bgColor?: string
  legend?: ReactNode
}

export const BarSegment: FC<BarSegmentProps> = ({
  width,
  style,
  value,
  legend,
  label,
  bgColor,
  id,
  ...props
}) => {
  const barGraphToolTip = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 164,
        padding: '8px',
      }}
    >
      {/* otherwise div with border doesnt work */}
      {legend && (
        <div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            marginBottom: 8,
          }}
        >
          <Text space="8px">{legend}</Text>
        </div>
      )}

      {!legend && label && (
        <div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            marginBottom: 8,
          }}
        >
          <Text space="8px">{label}</Text>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text weight={400}>{value}</Text>
        <Text weight={400} color="accent">
          {(+width).toFixed(0) + '%'}
        </Text>
      </div>
    </div>
  )
  const tooltipListeners = useTooltip(barGraphToolTip, 'bottom')

  return (
    <styled.div
      style={{
        height: 32,
        display: 'block',
        width: width + '%',
        backgroundColor: bgColor || color('accent'),
        opacity: `calc(1 - 0.${(id as any) * 2})`,
        ...style,
        '@media (hover: hover)': {
          '&:hover': {
            opacity: 0.5,
            backgroundColor: bgColor,
          },
        },
      }}
      {...props}
      {...tooltipListeners}
    >
      {/* {width} */}
    </styled.div>
  )
}

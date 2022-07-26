import React, { FC, useEffect, useState, useRef } from 'react'
import { styled } from 'inlines'
import { Text, Button, Card } from '~'
import { color, spaceToPx } from '~/utils'
import { ExpandRightIcon } from '~'
import { NumberFormat, prettyNumber } from '@based/pretty-number'

// type ScatterResultProps = {
//   data?: {}
// }

// Scatter word ScatterResult
export const ScatterResult = (props) => {
  console.log(props)
  return (
    <div>
      <ScatterInner {...props} />
    </div>
  )
}

const ScatterInner = ({
  data,
  width,
  height,
  header,
  xLabelFormat,
  yLabelFormat,
  info,
}) => {
  const ref = useRef<number>()

  console.log('from inner', data, width, height, header)

  let [index, setIndex] = useState(0)
  const [isDragging, setDragging] = useState(false)

  if (!data[index]) {
    index = data.length - 1
  }

  ref.current = index

  const [isPlaying, setPlay] = useState(true)

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setIndex(ref.current + 1)
      }, 1e3)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  let minY
  let maxY
  let minX
  let maxX

  const points = data[index].points

  for (let i = 0; i < points.length; i++) {
    const d = points[i]

    if (d.y > maxY || maxY === undefined) {
      maxY = d.y
    }

    if (d.y < minY || minY === undefined) {
      minY = d.y
    }

    if (d.x > maxX || maxX === undefined) {
      maxX = d.x
    }

    if (d.x < minX || minX === undefined) {
      minX = d.x
    }
  }

  const graphHeight = height - 50 - 50 - 24 - 50
  const graphWidth = width - 100 - 50

  const pxRatios = [
    1 / ((maxX - minX) / graphWidth),
    1 / ((maxY - minY) / graphHeight),
  ]

  const xLabelsP = []
  const labelW = 150
  const labelamount = (graphWidth + 50) / labelW
  const spread = (maxX - minX) / labelamount

  for (let i = 0; i < labelamount; i++) {
    // xLabel format
    // yLabel format
    xLabelsP.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          transform: `translate3d(${i * labelW}px,0px,0px)`,
        }}
      >
        <Text>
          {/* {{ value: spread * i + minX, format: xLabelFormat || 'number-short' }} */}
        </Text>
      </div>
    )
  }

  const xLabels = (
    <div
      style={{
        marginLeft: 100 + 25 + 16,
        marginTop: 8,
        width: graphWidth,
        position: 'relative',
      }}
    >
      {xLabelsP}
    </div>
  )

  const yLabelsP = []
  const labelH = 50
  const labelYamount = (graphHeight + 50) / labelH
  const spreadY = (maxY - minY) / labelYamount

  for (let i = 0; i < labelYamount; i++) {
    // xLabel format
    // yLabel format
    yLabelsP.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          transform: `translate3d(0px,${i * labelH}px,0px)`,
          display: 'flex',
          width: 84,
          justifyContent: 'flex-end',
        }}
      >
        <Text>
          {{
            value: maxY - spreadY * i,
            // format: yLabelFormat || 'number-short',
          }}
        </Text>
      </div>
    )
  }
  const yLabels = (
    <div
      style={{
        marginLeft: 0,
        marginTop: 4,
        position: 'absolute',
      }}
    >
      {/* {yLabelsP} */}
    </div>
  )

  return (
    <div
      style={{
        width,
        height,
        // border: '1px solid blue',
      }}
    >
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{}}>{header || ''}</Text>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text>
              {/* {{ value: data[index].time, format: 'date-time-human' }} */}
            </Text>
            <Button
              style={{
                marginLeft: 16,
                backgroundColor: isPlaying ? color('accent') : color('border'),
              }}
              onClick={() => {
                setPlay(!isPlaying)
              }}
              icon={ExpandRightIcon}
            />
          </div>
        </div>
        <ScatterSlider
          data={data}
          width={width}
          isDragging={isDragging}
          setDragging={setDragging}
          index={index}
          setIndex={setIndex}
        />
      </div>
      {yLabels}
      <div
        style={{
          marginLeft: 100,
          padding: 25,
          width: graphWidth + 50,
          height: graphHeight + 50,
          border: '1px solid ' + color('border'),
        }}
      >
        <div
          style={{
            position: 'relative',
            width: graphWidth,
            height: graphHeight,
            // margin: 100,
          }}
        >
          {points.map((v, i) => {
            const color = v.color

            const infoContent = []

            let tooltip = {}

            if (info) {
              for (const key in info) {
                infoContent.push(
                  <Card key={key} label={info[key].label}>
                    <Text>
                      {{
                        //    format: info[key].format,
                        value: v.info ? v.info[key] : 0,
                      }}
                    </Text>
                  </Card>
                )
              }
              //   tooltip = useTooltip(
              //     <div
              //       style={{
              //         padding: 24,
              //       }}
              //     >
              //       {infoContent}
              //     </div>,
              //     { width: 200 }
              //   )
            }

            console.log('V', v)

            return (
              <div
                key={v.label}
                style={{
                  position: 'absolute',
                  transitionTimingFunction: 'linear',
                  transition: isDragging
                    ? 'transform 0.1s, background 0.1s'
                    : 'transform 1s, background 0.15s',
                  transform: `translate3d(${
                    (v.x - minX) * pxRatios[0] - 20
                  }px,${(maxY - v.y) * pxRatios[1] - 20}px,0px)`,
                  top: 0,
                  left: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  background: 'white',
                  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                }}
                // {...tooltip}
              >
                <Text style={{ color: 'black' }} weight={600}>
                  {v.label}
                </Text>
              </div>
            )
          })}
        </div>
      </div>
      {xLabels}
    </div>
  )
}

// ***********   Scatter Slider  **********
const ScatterSlider = ({
  width,
  data,
  isDragging,
  setDragging,
  index,
  setIndex,
}) => {
  const ref = useRef<{ x: number; index: number }>()

  useEffect(() => {
    let moveHandler
    let up

    if (isDragging) {
      up = () => {
        setDragging(false)
      }

      moveHandler = (event) => {
        if (isDragging) {
          const xx =
            event.pageX -
            ref.current.x +
            ref.current.index * ((width - 120) / data.length)

          const index = Math.min(
            Math.max(0, Math.floor((xx / (width - 120)) * data.length)),
            data.length - 1
          )

          setIndex(index)
        }
      }

      document.addEventListener('mouseup', up)
      document.addEventListener('mousemove', moveHandler)
    }
    return () => {
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mousemove', moveHandler)
    }
  }, [isDragging, ref])

  return (
    <div
      style={{
        width,
        height: 50,
        paddingLeft: 8,
        paddingTop: 20,
      }}
    >
      <div
        style={{
          marginLeft: 90,
          width: width - 100,
          height: 20,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            marginTop: 8,
            position: 'absolute',
            height: 4,
            borderRadius: 2,
            backgroundColor: color('border'),
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            transform: `translate3d(${
              index * ((width - 120) / data.length)
            }px,0px,0px)`,
            transitionTimingFunction: 'linear',
            transition: isDragging ? null : 'transform 1s',
            top: 0,
            borderRadius: '50%',
            width: 20,
            height: 20,
            background: color('accent'),
          }}
          onMouseDown={(event) => {
            ref.current = { x: event.pageX, index }
            setDragging(true)
          }}
        />
      </div>
    </div>
  )
}

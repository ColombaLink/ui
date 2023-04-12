import React, { FC, useRef, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import { VariableSizeList } from 'react-window'
import { Text, color } from '~'

type LogTypes = {
  data: {
    time: string
    label: string
    msg: string
    type?: 'error' | 'success' | string
  }[]
  width?: number
  height?: number
  style?: Style
}

export const Log: FC<LogTypes> = ({
  data,
  width = 676,
  height = 360,
  style,
}) => {
  const [manualScrolling, setManualScrolling] = useState(false)
  const [backwardScrollCounter, setBackwardScrollCounter] = useState(0)

  const listRef = useRef(null)
  const parentDiv = useRef(null)

  // fira code 14px
  const LETTER_WIDTH = 8.399
  const WIDTH = width
  const HEIGHT = height

  useEffect(() => {
    if (backwardScrollCounter > 2) {
      setManualScrolling(true)
    }
  }, [backwardScrollCounter])

  useEffect(() => {
    if (!manualScrolling) {
      scrollToBottom()
      setBackwardScrollCounter(0)
    }
  }, [data?.length])

  const newLines = data?.map(
    (item) => `${item.time} [${item.label}] ${item.msg}`
  )
  const lineBreakPoint = Math.ceil(WIDTH / LETTER_WIDTH)
  const rowHeights = newLines?.map(
    (line) => Math.ceil(line.length / lineBreakPoint) * 20
  )

  const scrollToBottom = () => listRef?.current.scrollToItem(data?.length)
  const getItemSize = (index) => rowHeights && rowHeights[index]

  const Row = ({ index, style }) => (
    <styled.div
      style={{
        backgroundColor: index % 2 ? color('background') : color('background2'),
        ...style,
      }}
    >
      <Text
        size={14}
        style={{
          fontFamily: 'Fira Code, monospace, sans-serif',
        }}
        wrap
      >
        <span style={{ color: color('text2') }}>{data[index].time}</span>
        <span
          style={{
            color:
              data[index].type === 'error'
                ? color('red')
                : data[index].type === 'success'
                ? color('green')
                : color('accent'),
          }}
        >
          {' '}
          {data[index].label}{' '}
        </span>
        <span>{data[index].msg}</span>
      </Text>
    </styled.div>
  )

  return (
    <styled.div
      ref={parentDiv}
      style={{
        ...style,
      }}
    >
      <VariableSizeList
        onScroll={(e) => {
          if (e.scrollDirection === 'backward') {
            setBackwardScrollCounter(backwardScrollCounter + 1)
          }
          if (
            parentDiv.current &&
            e.scrollOffset >=
              parentDiv.current.firstChild.firstChild.clientHeight - HEIGHT
          ) {
            setManualScrolling(false)
          }
        }}
        ref={listRef}
        height={HEIGHT}
        itemCount={newLines?.length}
        itemSize={getItemSize}
        width={WIDTH}
        // style={{ scrollBehavior: 'smooth' }}
      >
        {Row}
      </VariableSizeList>
    </styled.div>
  )
}

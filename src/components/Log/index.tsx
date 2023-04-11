import React, { FC, useRef, useEffect, useState } from 'react'
import { styled, Style } from 'inlines'
import { LogTypes } from './types'
import { VariableSizeList } from 'react-window'
import { Text, color } from '~'

// fira code 14px
const LETTER_WIDTH = 8.399
const WIDTH = 800

// todo
// react window -> infinite loader for virtualization
// show new data on bottom infinite scroll..

export const Log: FC<LogTypes> = ({ data }) => {
  const [manualScrolling, setManualScrolling] = useState(false)
  const [backwardScrollCounter, setBackwardScrollCounter] = useState(0)

  const listRef = useRef(null)

  useEffect(() => {
    if (backwardScrollCounter > 2) {
      console.log('🤖')
      setManualScrolling(true)
    }
  }, [backwardScrollCounter])

  useEffect(() => {
    console.log('FIRE 🔥')

    if (!manualScrolling) {
      scrollToBottom()
      setBackwardScrollCounter(0)
      console.log('scrollheight', listRef.current)
    }
  }, [data.length])

  // listRef.current.addEventListener('scroll', (e) => {
  //   console.log('they see me scrolling')
  // })

  const scrollToBottom = () => listRef?.current.scrollToItem(data.length)

  //  length for each item
  const newLines = data.map(
    (item) => `${item.time} [${item.label}] ${item.msg}`
  )
  const lineBreakPoint = Math.ceil(WIDTH / LETTER_WIDTH)
  console.log(lineBreakPoint)
  const rowHeights = newLines.map(
    (line) => Math.ceil(line.length / lineBreakPoint) * 20
  )

  const getItemSize = (index) => rowHeights[index]

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
        <span style={{ color: color('accent') }}> {data[index].label} </span>
        <span>{data[index].msg}</span>
      </Text>
    </styled.div>
  )

  return (
    <styled.div>
      <VariableSizeList
        onScroll={(e) => {
          if (e.scrollDirection === 'backward') {
            setBackwardScrollCounter(backwardScrollCounter + 1)
          }
          console.log('Scrolling, hating', e)
        }}
        ref={listRef}
        height={360}
        itemCount={newLines.length}
        itemSize={getItemSize}
        width={WIDTH}
        style={{ scrollBehavior: 'smooth' }}
      >
        {Row}
      </VariableSizeList>
    </styled.div>
  )
}

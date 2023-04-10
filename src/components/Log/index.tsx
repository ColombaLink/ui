import React, { FC, useRef } from 'react'
import { styled, Style } from 'inlines'
import { LogTypes } from './types'
import { VariableSizeList } from 'react-window'
import { Text } from '~'

// fira code 14px
const LETTER_WIDTH = 8.399
const WIDTH = 500
// line height = 19 nu

// todo
// monofont -> for calculation of height per item
// react window -> infinite loader for virtualization
// show new data on bottom infinite scroll..

// maak van elk data item 1 lange string zodat je de lengte weet

export const Log: FC<LogTypes> = ({ data }) => {
  console.log(data)

  //  length for each item
  const newLines = data.map((item) => `${item.time} ${item.label} ${item.msg}`)

  console.log(newLines)

  const rowHeights = newLines.map((line) => (line.length > 59 ? 40 : 20))

  const getItemSize = (index) => rowHeights[index]

  const Row = ({ index, style }) => (
    <styled.div
      style={{ backgroundColor: index % 2 ? '#f6f6f6' : 'white', ...style }}
    >
      <Text
        size={14}
        style={{
          fontFamily: 'Fira Code, monospace, sans-serif',
        }}
        wrap
      >
        {newLines[index]}
      </Text>
    </styled.div>
  )

  return (
    <styled.div>
      <VariableSizeList
        height={360}
        itemCount={newLines.length}
        itemSize={getItemSize}
        width={WIDTH}
      >
        {Row}
      </VariableSizeList>
    </styled.div>
  )
}

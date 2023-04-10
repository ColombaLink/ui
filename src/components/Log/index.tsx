import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { LogTypes } from './types'
import { VariableSizeList } from 'react-window'

// todo
// monofont -> for calculation of height per item
// react window -> infinite loader for virtualization
// show new data on bottom infinite scroll..

export const Log: FC<LogTypes> = ({ data }) => {
  console.log(data)

  // These row heights are arbitrary.
  // Yours should be based on the content of the row.
  const rowHeights = new Array(200)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50))

  const randomColor = (): string =>
    `#${(~~(Math.random() * (1 << 24))).toString(16)}`

  const getItemSize = (index) => rowHeights[index]

  const Row = ({ index, style }) => (
    <div style={{ backgroundColor: randomColor(), ...style }}>Row {index}</div>
  )

  return (
    <styled.div>
      log it
      <VariableSizeList
        height={360}
        itemCount={100}
        itemSize={getItemSize}
        width={500}
      >
        {Row}
      </VariableSizeList>
    </styled.div>
  )
}

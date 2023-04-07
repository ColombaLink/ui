import React, { ReactNode, FC, useState } from 'react'
import { styled, Style, Text } from '~'

type TableHeaderProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
  columnWidthsArr: number[]
  setColumnWidthsArr: (e) => void
}

const TableHeaderItem = styled('div', {
  height: 36,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  // default width for now
  width: 124,
  overflow: 'hidden',
})

const ResizeDragLine = styled('div', {
  width: 4,
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'red',
  cursor: 'col-resize',
})

export const TableHeader: FC<TableHeaderProps> = ({
  headers,
  columnWidthsArr,
  setColumnWidthsArr,
}) => {
  // console.log('TABLE header columns width arr', columnWidthsArr)

  return (
    <styled.div
      style={{
        display: 'flex',
        borderBottom: '1px solid rgba(28, 45, 65, 0.1)',
      }}
    >
      {headers?.map((item, idx) => (
        <TableHeaderItem
          key={item.key}
          style={{ width: columnWidthsArr[idx] }}
          onMouseDown={(e) => {
            console.log('👻 idx', idx, e)
            console.log('mouse down screen X =>', e.screenX)
          }}
          onMouseUp={(e) => console.log('mouse up screenY', e.screenX)}
        >
          <Text color="text2">{item.label}</Text>
          <ResizeDragLine
            onMouseDown={({ currentTarget, clientX: startX }) => {
              // @ts-ignore
              const { offsetWidth } = currentTarget.parentNode
              const onUp = () => {
                removeEventListener('mouseup', onUp)
                removeEventListener('mousemove', onMove)
              }
              const onMove = ({ clientX }) => {
                columnWidthsArr[idx] = Math.max(
                  40,
                  offsetWidth - (startX - clientX)
                )
                setColumnWidthsArr([...columnWidthsArr])
              }
              addEventListener('mousemove', onMove)
              addEventListener('mouseup', onUp)
            }}
          />
        </TableHeaderItem>
      ))}
    </styled.div>
  )
}

import React from 'react'
import { styled } from 'inlines'
import { color } from '~/utils'

export const HeaderDragLine = ({
  index,
  setColWidths,
  colWidths,
  style,
  hovering,
}) => {
  const width = 4
  return (
    <styled.div
      onMouseDown={({ currentTarget, clientX: startX }) => {
        // @ts-ignore
        const { offsetWidth } = currentTarget.parentNode
        const onUp = () => {
          removeEventListener('mouseup', onUp)
          removeEventListener('mousemove', onMove)
        }
        const onMove = ({ clientX }) => {
          colWidths[index] = Math.max(40, offsetWidth - (startX - clientX))
          setColWidths([...colWidths])
        }
        addEventListener('mousemove', onMove)
        addEventListener('mouseup', onUp)
      }}
      style={{
        zIndex: 1,
        position: 'absolute',
        // right: -width / 2,
        right: width,
        height: 32,
        bottom: 0,
        width,
        cursor: 'col-resize',
        backgroundColor: hovering ? color('background') : 'transparent',
        '&:hover>div': {
          //   backgroundColor: color('border'),
          backgroundColor: color('accent'),
        },
        ...style,
      }}
    >
      <div
        style={{
          marginLeft: width / 2,
          width: 2,
          height: '100%',
        }}
      />
    </styled.div>
  )
}

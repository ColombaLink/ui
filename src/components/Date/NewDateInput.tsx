import React, { useRef, useState } from 'react'
import { styled } from 'inlines'
import { border, color } from '~/utils'

export const NewDateInput = () => {
  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<number>()

  return (
    <styled.div style={{ marginBottom: 56 }}>
      <input
        type="number"
        style={{ maxWidth: 40, border: '1px solid red' }}
        ref={dayRef}
        value={day}
        onChange={(e) => {
          if (+e.target.value < 1 || +e.target.value > 31) {
            setDay(1)
          } else {
            setDay(+e.target.value)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            monthRef.current.focus()
          }
        }}
      />
      <input
        type="number"
        style={{ maxWidth: 40, border: '1px solid red' }}
        ref={monthRef}
        value={month}
        onChange={(e) => setMonth(+e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            yearRef.current.focus()
          }
          if (e.key === 'ArrowLeft') {
            dayRef.current.focus()
          }
        }}
      />
      <input
        type="number"
        style={{ maxWidth: 40, border: '1px solid red' }}
        ref={yearRef}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            monthRef.current.focus()
          }
        }}
      />

      <styled.div
        style={{
          display: 'flex',
          border: border(1, 'border'),
          borderRadius: 8,
          boxShadow: `0px 1px 4px ${color('background2')}`,
          minHeight: 36,
          paddingLeft: 12,
          paddingRight: 12,
          alignItems: 'center',
          width: 280,
        }}
      >
        <styled.div
          style={{
            padding: '0px 2px',
            // backgroundColor: color('accent'),
            borderRadius: 4,
          }}
          onClick={() => dayRef.current.focus()}
        >
          dd {day < 10 ? `0${day}` : day}
        </styled.div>
        <styled.div>/</styled.div>
        <styled.div
          style={{
            padding: '0px 2px',
            // backgroundColor: color('accent'),
            borderRadius: 4,
          }}
          onClick={() => monthRef.current.focus()}
        >
          mm {month < 10 ? `0${month}` : month}
        </styled.div>
        <styled.div>/</styled.div>
      </styled.div>
    </styled.div>
  )
}

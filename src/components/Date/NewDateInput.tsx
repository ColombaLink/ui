import React, { useRef, useState } from 'react'
import { styled } from 'inlines'
import { border, color } from '~/utils'
import { CalendarAltIcon } from '~/icons'

export const NewDateInput = () => {
  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [day, setDay] = useState<any>('')
  const [month, setMonth] = useState<any>('')
  const [year, setYear] = useState<any>('')

  const [focusField, setFocusField] = useState<
    'dayFocus' | 'monthFocus' | 'yearFocus' | ''
  >('')

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
          if (e.key === 'Backspace' && +e.target.value < 10) {
            setDay('')
          }

          if (e.key === 'ArrowDown' && +e.target.value === 1) {
            setDay(32)
          }
        }}
        onKeyUp={(e) => {
          if (+e.key > 3) {
            monthRef.current.select()
          }
          if (
            e.target.value.length > 1 &&
            e.key !== 'ArrowDown' &&
            e.key !== 'ArrowUp' &&
            e.key !== 'ArrowLeft'
          ) {
            monthRef.current.select()
          }
          if (e.key === 'ArrowRight') {
            // monthRef.current.focus()
            monthRef.current.select()
          }
        }}
        onFocus={() => setFocusField('dayFocus')}
        onBlur={() => setFocusField('')}
      />
      <input
        type="number"
        style={{ maxWidth: 40, border: '1px solid red' }}
        ref={monthRef}
        value={month}
        onChange={(e) => {
          if (+e.target.value < 1 || +e.target.value > 12) {
            setMonth(1)
          } else {
            setMonth(+e.target.value)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && +e.target.value < 10) {
            setMonth('')
          }
          if (e.key === 'ArrowDown' && +e.target.value === 1) {
            setMonth(13)
          }
        }}
        onKeyUp={(e) => {
          if (+e.key > 1 && +e.target.value > 1) {
            yearRef.current.select()
          }
          if (
            e.target.value.length > 1 &&
            e.key !== 'ArrowDown' &&
            e.key !== 'ArrowUp' &&
            e.key !== 'ArrowLeft'
          ) {
            yearRef.current.select()
          }
          if (e.key === 'ArrowRight') {
            yearRef.current.select()
          }
          if (e.key === 'ArrowLeft') {
            dayRef.current.select()
          }
        }}
        onFocus={() => setFocusField('monthFocus')}
        onBlur={() => setFocusField('')}
      />
      <input
        type="number"
        style={{ maxWidth: 40, border: '1px solid red' }}
        ref={yearRef}
        value={year}
        onChange={(e) => setYear(+e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && e.target.value.length === 1) {
            setYear('')
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'ArrowLeft') {
            monthRef.current.select()
          }
        }}
        onFocus={() => setFocusField('yearFocus')}
        onBlur={() => setFocusField('')}
      />

      <styled.div
        style={{
          display: 'flex',
          position: 'relative',
          border: border(1, 'border'),
          borderRadius: 8,
          boxShadow: `0px 1px 4px ${color('background2')}`,
          minHeight: 36,
          paddingLeft: 32,
          paddingRight: 12,
          alignItems: 'center',
          width: 280,
          marginTop: 40,
        }}
      >
        <CalendarAltIcon style={{ position: 'absolute', left: 8, bottom: 8 }} />
        <styled.div
          style={{
            padding: '0px 1px',
            backgroundColor:
              focusField === 'dayFocus'
                ? color('lightaccent')
                : color('background'),
            borderRadius: 4,
          }}
          onClick={() => {
            dayRef.current.focus()
            dayRef.current.select()
          }}
        >
          {day === '' ? 'dd' : day < 10 ? `0${day}` : day}
        </styled.div>
        <styled.div>/</styled.div>
        <styled.div
          style={{
            padding: '0px 1px',
            backgroundColor:
              focusField === 'monthFocus'
                ? color('lightaccent')
                : color('background'),
            borderRadius: 4,
          }}
          onClick={() => {
            monthRef.current.focus()
            monthRef.current.select()
          }}
        >
          {month === '' ? 'mm' : month < 10 ? `0${month}` : month}
        </styled.div>
        <styled.div>/</styled.div>
        <styled.div
          style={{
            padding: '0px 1px',
            backgroundColor:
              focusField === 'yearFocus'
                ? color('lightaccent')
                : color('background'),
            borderRadius: 4,
          }}
          onClick={() => {
            yearRef.current.focus()
            yearRef.current.select()
          }}
        >
          {year === '' ? 'yyyy' : year}
        </styled.div>
      </styled.div>
    </styled.div>
  )
}

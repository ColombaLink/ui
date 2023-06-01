import React, { useRef, useState, useEffect } from 'react'
import { styled } from 'inlines'
import { border, color } from '~/utils'
import { CalendarAltIcon } from '~/icons'
import { useContextMenu, useContextState } from '~/hooks'
import { Picker } from './Picker'

type newDateProps = {
  // milliseconds
  value?: number
  setValue: (e) => void
}

const stringToMilliseconds = (str: string): number => {
  const dateString = `${str?.split('/').reverse().join('-')}T00:00`
  const outputMs = new Date(dateString).getTime()
  console.log('output in ms 🎉', outputMs)
  return outputMs
}

export const NewDateInput = ({ value, setValue }) => {
  //  const [value] = useContextState('val')

  console.log('The value ⏰', value)

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [day, setDay] = useState<any>(
    value ? new Date(value).getDate() + 1 : ''
  )
  const [month, setMonth] = useState<any>(
    value ? new Date(value).getMonth() + 1 : ''
  )
  const [year, setYear] = useState<any>(
    value ? new Date(value).getFullYear() : ''
  )

  const [focusField, setFocusField] = useState<
    'dayFocus' | 'monthFocus' | 'yearFocus' | ''
  >('')

  const fullDateString = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`

  useEffect(() => {
    if (
      day &&
      month &&
      year &&
      stringToMilliseconds(fullDateString) !== value
    ) {
      console.log('FIREBALL 🔥')
      setValue(stringToMilliseconds(fullDateString))
    }
  }, [day, month, year])

  console.log('FullDate Srting', fullDateString)

  const openPicker = useContextMenu(
    Picker,
    {
      //   valueAsString,
      setValue,
    },
    {
      width: 'target',
    }
  )

  return (
    <styled.div style={{ marginBottom: 56 }}>
      <styled.div style={{ opacity: 0.33 }}>
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
          style={{ maxWidth: 40, border: '1px solid purple' }}
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
          style={{ maxWidth: 40, border: '1px solid green' }}
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
      </styled.div>

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
        onClick={(e) => {
          e.preventDefault()
          openPicker(e)
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

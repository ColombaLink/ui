import React, { useRef, useState, useEffect } from 'react'
import { Style, styled } from 'inlines'
import { border, color } from '~/utils'
import { CalendarAltIcon } from '~/icons'
import { useOverlay } from '~/hooks'
import { Picker } from '../Date/Picker'
import { FromRangePicker } from './FromRangePicker'
import { TillRangePicker } from './TillRangePicker'

type newDateRangeInputProps = {
  value?: number
  setValue: (e) => void
  isFromRange?: boolean
  isTillRange?: boolean
  style?: Style
}

export const NewDateRangeInput = ({
  value,
  setValue,
  isFromRange,
  isTillRange,
  style,
}: newDateRangeInputProps) => {
  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  // try this
  const DateObjVal = new Date(value)

  const newDay = DateObjVal.getDate()
  const newMonth = DateObjVal.getMonth() + 1
  const newYear = DateObjVal.getFullYear()

  const [day, setDay] = useState<any>(newDay || '')
  const [month, setMonth] = useState<any>(newMonth || '')
  const [year, setYear] = useState<any>(newYear || '')

  const [focusField, setFocusField] = useState<
    'dayFocus' | 'monthFocus' | 'yearFocus' | ''
  >('')

  const fullDateString = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`

  // get the time as string format 00:00
  const timeString = '00:00'

  const stringToMilliseconds = (str: string, time?: string): number => {
    const dateString = `${str?.split('/').reverse().join('-')}T${
      time || '00:00'
    }`
    const outputMs = new Date(dateString).getTime()
    return outputMs
  }

  useEffect(() => {
    if (
      day &&
      month &&
      year.toString().length > 3 &&
      stringToMilliseconds(fullDateString, timeString) !== value
    ) {
      setValue(stringToMilliseconds(fullDateString, timeString))
    }
  }, [day, month, year, timeString])

  useEffect(() => {
    setDay(newDay || '')
    setMonth(newMonth || '')
    setYear(newYear || '')
  }, [value])

  const openPicker = useOverlay(
    Picker,
    { setValue, timeString, stringToMilliseconds },
    { width: 'target' }
  )

  // if is range
  const openFromRangePicker = useOverlay(
    FromRangePicker,
    { setValue, timeString, stringToMilliseconds },
    { width: 'target' }
  )
  const openTillRangePicker = useOverlay(
    TillRangePicker,
    { setValue, timeString, stringToMilliseconds },
    { width: 'target' }
  )

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // console.log('Days in this month', daysInMonth(newMonth, newYear))

  return (
    <styled.div style={{ display: 'flex' }}>
      {/* hide from ui - user */}
      <styled.div
        style={{
          opacity: 0,
          position: 'absolute',
          pointerEvents: 'none',
          //  marginTop: -32,
        }}
      >
        <input
          type="number"
          style={{ maxWidth: 40, border: '1px solid red' }}
          ref={dayRef}
          value={day}
          onChange={(e) => {
            // should get last day of the month
            if (
              +e.target.value < 1 ||
              +e.target.value > daysInMonth(newMonth, newYear)
            ) {
              setDay(1)
            } else {
              setDay(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              setDay('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setDay(daysInMonth(newMonth, newYear) + 1)
            }
          }}
          onKeyUp={(e) => {
            if (+e.key > 3) {
              monthRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
              e.key !== 'ArrowDown' &&
              e.key !== 'ArrowUp' &&
              e.key !== 'ArrowLeft'
            ) {
              monthRef.current.select()
            }
            if (e.key === 'ArrowRight') {
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
            if (e.key === 'Backspace') {
              setMonth('')
            }
            if (e.key === 'ArrowDown' && +e.currentTarget.value === 1) {
              setMonth(13)
            }
          }}
          onKeyUp={(e) => {
            if (+e.key > 1 && +e.currentTarget.value > 1) {
              yearRef.current.select()
            }
            if (
              e.currentTarget.value.length > 1 &&
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
              dayRef.current.focus()
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
          onChange={(e) => {
            if (day === 29 && month === 2) {
              // Set year to schikkeljaar
              console.log('leap year 🐸')
            } else {
              setYear(+e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (day === 29 && month === 2 && e.key === 'ArrowUp') {
              setYear(year + 4)
            }
            if (day === 29 && month === 2 && e.key === 'ArrowDown') {
              setYear(year - 4)
            }
            if (e.key === 'Backspace') {
              setYear('')
            }
          }}
          onKeyUp={(e) => {
            if (e.key === 'ArrowLeft') {
              monthRef.current.select()
            }
            if (e.key === 'ArrowRight') {
              console.log('oi mate')
            }
          }}
          onFocus={() => setFocusField('yearFocus')}
          onBlur={() => setFocusField('')}
        />
      </styled.div>

      <styled.div
        style={{
          border: '2px solid transparent',
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            position: 'relative',
            border: border(1, 'border'),
            borderRadius: 8,
            boxShadow: `0px 1px 4px ${color('background2')}`,
            height: 36,
            paddingLeft: 32,
            paddingRight: 12,
            alignItems: 'center',
            width: 280,
            ...style,
          }}
          onClick={(e) => {
            e.preventDefault()
            if (isFromRange) {
              openFromRangePicker(e)
            } else if (isTillRange) {
              openTillRangePicker(e)
            } else {
              openPicker(e)
            }
          }}
        >
          <CalendarAltIcon
            style={{ position: 'absolute', left: 8, bottom: 9 }}
          />
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
    </styled.div>
  )
}

import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import { color } from '~'

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 4,
  minHeight: 36,
  paddingLeft: 12,
  paddingRight: 12,
  cursor: 'text',
  border: `1px solid ${color('border')}`,
  '&::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
  '&[type="date"]::-webkit-input-placeholder': {
    visibility: 'hidden !important',
  },
  '&[type="date"]:input-placeholder': {
    visibility: 'hidden !important',
  },
})

export const DateTimePicker = () => {
  let dateObj = new Date()

  console.log('vandaag', new Date())

  const currentDay = dateObj.getDate()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()

  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const [inputValue, setInputValue] = useState(
    `${currentYear}-${currentMonth}-${currentDay}`
  )

  console.log('the input value', inputValue)

  const changeHandler = (year, month, day) => {
    if (day < 10) {
      day = `0${day}`
      setSelectedDay(day)
    } else {
      setSelectedDay(day)
    }
    if (month < 10) {
      month = `0${month}`
      setSelectedMonth(month)
    } else {
      setSelectedMonth(month)
    }
    setSelectedYear(year)

    setInputValue(`${year}-${month}-${day}`)
  }

  /// value
  /// min
  /// max
  /// onChange
  // step??

  // options -> year, months, days, hours, minutes, seconds, milliseconds

  return (
    <div>
      Dateobj naar string: {dateObj.toLocaleString()}
      <br />
      InputValue : {inputValue}
      <br />
      SelectedDay: {selectedDay}
      <br />
      SelectedMonth: {selectedMonth}
      <br />
      SelectedYear: {selectedYear}
      <Spacer />
      <div style={{ display: 'flex', gap: 16 }}>
        <StyledDateInput
          style={{ maxWidth: 280 }}
          placeholder="2001/01/10"
          type="date"
          onClick={(e) => {
            //hides the calender in firefox
            e.preventDefault()
          }}
          onChange={(e) => {
            console.log('e from onchange: ', e)
            console.log('value from onchange: ', e.target.value)
            setInputValue(e.target.value)
          }}
          value={inputValue}
        />

        <TimeInput />
        <Input style={{ maxWidth: 160 }} placeholder="UTC+02:00" />
      </div>
      <DatePicker
        year={selectedYear}
        month={selectedMonth}
        day={selectedDay}
        onChange={changeHandler}
      />
    </div>
  )
}

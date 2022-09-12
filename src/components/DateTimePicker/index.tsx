import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import { color, Select } from '~'

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
  const currentDate = new Date()

  const formatYmd = (date) => date.toISOString().slice(0, 10)
  const formattedDate = formatYmd(currentDate)

  const [inputValue, setInputValue] = useState(formattedDate)
  const [inputTime, setInputTime] = useState('00:00')

  const dateAndTime = `${inputValue}T${inputTime}`

  /// value
  /// min
  /// max
  /// onChange
  // step??

  // options -> year, months, days, hours, minutes, seconds, milliseconds

  return (
    <div>
      <br />
      Input DATE : {inputValue} | Input Time : {inputTime}
      <br />
      combined output : {dateAndTime}
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
            setInputValue(e.target.value)
          }}
          value={inputValue}
        />

        <TimeInput setInputTime={setInputTime} inputTime={inputTime} />

        <Select
          style={{ maxWidth: 160, fontWeight: 400 }}
          placeholder="Timezone"
          options={['UTC+00:00', 'UTC+01:00']}
          onChange={() => {}}
        />
      </div>
      <DatePicker inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  )
}

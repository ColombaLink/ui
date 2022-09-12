import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import { color, Select, useOverlay, Text } from '~'

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
  const [showDatePicker, setShowDatePicker] = useState(false)

  const dateAndTime = `${inputValue}T${inputTime}`

  console.log('input value', typeof inputValue)

  // formatted date time to miliseconds
  const dateAndTimeToMiliseconds = new Date(dateAndTime).getTime()
  console.log('to miliseconds ------> ', dateAndTimeToMiliseconds)

  // miliseconds to date time
  const milisecondsToDateAndTime = new Date(dateAndTimeToMiliseconds)
  console.log('to date and time ------> ', milisecondsToDateAndTime)

  return (
    <div>
      <br />
      Input DATE : {inputValue} | Input Time : {inputTime}
      <br />
      combined output : {dateAndTime}
      <Spacer />
      <Text space="8px">Date Time</Text>
      <div style={{ display: 'flex', gap: 16 }}>
        <StyledDateInput
          style={{
            maxWidth: 280,
            background: showDatePicker ? color('background2') : '',
            borderBottomLeftRadius: showDatePicker ? 0 : 4,
            borderBottomRightRadius: showDatePicker ? 0 : 4,
          }}
          placeholder="2001/01/10"
          type="date"
          onClick={(e) => {
            //hides the calender in firefox
            e.preventDefault()
            setShowDatePicker(true)
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          value={inputValue}
          onBlur={() => {}}

          // onFocus={useContextMenu(
          //   DatePicker,
          //   { inputValue, setInputValue },
          //   { placement: 'center', width: 280 }
          // )}
        />

        <TimeInput setInputTime={setInputTime} inputTime={inputTime} />

        <Select
          style={{ maxWidth: 160, fontWeight: 400, height: 36 }}
          placeholder="Timezone"
          options={['UTC+00:00', 'UTC+01:00']}
          onChange={() => {}}
        />
      </div>
      {showDatePicker && (
        <DatePicker inputValue={inputValue} setInputValue={setInputValue} />
      )}
    </div>
  )
}

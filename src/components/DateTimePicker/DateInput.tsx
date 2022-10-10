import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { color, CalendarIcon } from '~'
import { DatePicker } from './DatePicker'

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 4,
  minHeight: 36,
  paddingLeft: 28,
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

type DateInputProps = {
  value?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
}

export const DateInput: FC<DateInputProps> = ({
  value,
  setFocused,
  dateHandler,
  clearHandler,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  if (showDatePicker) {
    setFocused(true)
  }

  const dateInputHandler = (e) => {
    if (e.target.value.length === 2) {
      e.target.value = e.target.value + '/'
    }
    if (e.target.value.length === 5) {
      e.target.value = e.target.value + '/'
    }
    console.log('-->>', e.target.value)

    dateHandler(e.target.value)
  }

  return (
    <div style={{ position: 'relative' }}>
      <CalendarIcon
        size={14}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      />
      <StyledDateInput
        value={value}
        placeholder="Select a date"
        type="text"
        //  pattern="\d{1,2}/\d{1,2}/\d{4}"
        style={{
          backgroundColor: showDatePicker ? color('background2') : '',
          borderBottomLeftRadius: showDatePicker ? 0 : 4,
          borderBottomRightRadius: showDatePicker ? 0 : 4,
          borderBottom: showDatePicker
            ? '0px solid'
            : `1px solid ${color('border')}`,
        }}
        onChange={(e) => {
          dateInputHandler(e)
        }}
        onClick={(e) => {
          // hides the calender in firefox
          //  TODO
          e.preventDefault()
          setShowDatePicker(true)
          if (value === '') {
            console.log('Empty yo')
            value = '08/09/2077'
          }
          console.log('Value', value)
        }}
        onFocus={() => {
          setIsFocus(true)
          setFocused(true)
          setShowDatePicker(true)
        }}
        onBlur={() => {
          setFocused(false)
          setIsFocus(false)
        }}
      />
      {/* {isFocus && (
        <div
          style={{
            border: `2px solid ${color('accent')}`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
          }}
        />
      )} */}
      {showDatePicker && (
        <DatePicker
          inputValue={value}
          setInputValue={dateHandler}
          setShowDatePicker={setShowDatePicker}
          setFocused={setFocused}
          clearHandler={clearHandler}
        />
      )}
    </div>
  )
}

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
}

export const DateInput: FC<DateInputProps> = ({
  value,
  setFocused,
  dateHandler,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  if (showDatePicker) {
    setFocused(true)
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
        type="date"
        value={value}
        onChange={(e) => {
          dateHandler(e.target.value)
        }}
        onClick={(e) => {
          // hides the calender in firefox
          e.preventDefault()
          setShowDatePicker(true)
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
      {isFocus && (
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
      )}
      {showDatePicker && (
        <DatePicker
          inputValue={value}
          setInputValue={dateHandler}
          setShowDatePicker={setShowDatePicker}
          setFocused={setFocused}
        />
      )}
    </div>
  )
}

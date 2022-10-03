import React, { FC, CSSProperties, useState } from 'react'
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
  //   onChange?: (value: number) => void
  // style?: CSSProperties
  error?: (value: boolean | string | number) => string
  value?: number | string
  placeholder?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
}

export const DateInput: FC<DateInputProps> = ({
  value,
  placeholder,
  setFocused,
  dateHandler,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

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
      />
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

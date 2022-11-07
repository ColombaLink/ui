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

  const dateObj = new Date()

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
          backgroundColor: showDatePicker
            ? color('background2')
            : color('background'),
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
          if (value === '') {
            dateInputHandler({
              target: {
                value: `${dateObj.getUTCDate()}/${
                  dateObj.getUTCMonth() + 1
                }/${dateObj.getUTCFullYear()}`,
              },
            })
          }
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

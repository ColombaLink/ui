import React, { FC, useEffect, useState, useRef } from 'react'
import {
  color,
  CalendarAltIcon,
  boxShadow,
  styled,
  Style,
  useContextMenu,
} from '~'
import { DatePicker } from './DatePicker'

type DateInputProps = {
  value?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
  fromValue?: string
  tillValue?: string
  style?: Style
  placeholder?: string
  focusOnBeginDate?: boolean
  focusOnEndDate?: boolean
  isEndDate?: boolean
  isDateRange?: boolean
  setFromValue?: (value: string) => void
  setTillValue?: (value: string) => void
  setFocusOnBeginDate?: (value: boolean) => void
  setFocusOnEndDate?: (value: boolean) => void
  onClick?: () => void
}

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 8,
  minHeight: 36,
  paddingLeft: 28,
  paddingRight: 12,
  cursor: 'text',
  border: `1px solid ${color('border')}`,
  boxShadow: boxShadow('medium'),
})

export const DateInput: FC<DateInputProps> = ({
  value,
  setFocused,
  dateHandler,
  clearHandler,
  fromValue,
  tillValue,
  style,
  placeholder,
  focusOnBeginDate,
  focusOnEndDate,
  isEndDate,
  isDateRange,
  setFromValue,
  setTillValue,
  setFocusOnBeginDate,
  setFocusOnEndDate,
  onClick,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [, setIsFocus] = useState(false)

  const dateObj = new Date()

  const inputRef = useRef<HTMLInputElement | any>(null)

  useEffect(() => {
    if (focusOnEndDate && !focusOnBeginDate && !tillValue) {
      inputRef.current.focus()

      inputRef.current.value = dateInputHandler({
        target: {
          value: `--/${
            dateObj.getUTCMonth() + 1 < 10
              ? '0' + (dateObj.getUTCMonth() + 1)
              : dateObj.getUTCMonth() + 1
          }/${dateObj.getUTCFullYear()}`,
        },
      })
    }
  }, [focusOnEndDate, focusOnBeginDate])

  const handler = useContextMenu(
    DatePicker,
    {
      setShowDatePicker,
      value,
      dateHandler,
      setFocused,
      clearHandler,
      isDateRange,
      fromValue,
      tillValue,
      setFromValue,
      setTillValue,
      focusOnBeginDate,
      focusOnEndDate,
      setFocusOnBeginDate,
      setFocusOnEndDate,
    },
    {
      width: 'target',
    }
  )

  useEffect(() => {
    console.log('Value ??⭐️', value)
  }, [value])

  useEffect(() => {
    if (!focusOnEndDate && focusOnBeginDate) {
      inputRef.current.focus()
    }
    if (focusOnEndDate && !focusOnBeginDate) {
      inputRef.current.focus()
    }
  }, [focusOnBeginDate, focusOnEndDate])

  if (showDatePicker) {
    setFocused(true)
  }

  useEffect(() => {
    if (value[0] === 'N') {
      inputRef.current.value = dateInputHandler({
        target: {
          value: `--${value?.substr(3)}`,
        },
      })
    }
  }, [value])

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
      <CalendarAltIcon
        size={16}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      />

      <StyledDateInput
        ref={inputRef}
        value={value}
        placeholder={placeholder || 'Select a date'}
        type="text"
        style={{
          backgroundColor: showDatePicker
            ? color('background2')
            : color('background'),
          borderBottomLeftRadius: showDatePicker ? 0 : 8,
          borderBottomRightRadius: showDatePicker ? 0 : 8,
          borderBottom: showDatePicker
            ? '0px solid'
            : `1px solid ${color('border')}`,
          paddingLeft: 32,
          ...style,
        }}
        onChange={(e) => {
          dateInputHandler(e)
        }}
        onClick={(e) => {
          if (value === '') {
            dateInputHandler({
              target: {
                value: `--/${
                  dateObj.getUTCMonth() + 1 < 10
                    ? '0' + (dateObj.getUTCMonth() + 1)
                    : dateObj.getUTCMonth() + 1
                }/${dateObj.getUTCFullYear()}`,
              },
            })
          }
          e.preventDefault()
          setShowDatePicker(true)
          handler(e)
          if (isDateRange) {
            onClick()
          }
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
    </div>
  )
}

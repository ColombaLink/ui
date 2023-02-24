import React, { CSSProperties, FC, useEffect, useState, useRef } from 'react'
import { styled } from 'inlines'
import { color, CalendarAltIcon, boxShadow } from '~'
import { DatePicker } from './DatePicker'

type DateInputProps = {
  value?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
  fromValue?: string
  tillValue?: string
  style?: CSSProperties
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

  // console.log('focusOnEndDate', focusOnEndDate)
  // console.log('focusOnBeginDate', focusOnBeginDate)

  useEffect(() => {
    if (focusOnEndDate && !focusOnBeginDate && !tillValue) {
      inputRef.current.focus()

      // @ts-ignore
      inputRef.current.value = dateInputHandler({
        target: {
          value:
            // `${
            //   dateObj.getUTCDate() < 10
            //     ? '0' + dateObj.getUTCDate()
            //     : dateObj.getUTCDate()
            // }
            `--/${
              dateObj.getUTCMonth() + 1 < 10
                ? '0' + (dateObj.getUTCMonth() + 1)
                : dateObj.getUTCMonth() + 1
            }/${dateObj.getUTCFullYear()}`,
        },
      })
    }
  }, [focusOnEndDate, focusOnBeginDate])

  // moet er voor zorgen dat de focus wisselt
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

  // lister for the value of the input
  useEffect(() => {
    if (value[0] === 'N') {
      // @ts-ignore
      inputRef.current.value = dateInputHandler({
        target: {
          value:
            // `${
            //   dateObj.getUTCDate() < 10
            //     ? '0' + dateObj.getUTCDate()
            //     : dateObj.getUTCDate()
            // }
            `--${value?.substr(3)}`,
        },
      })
    }

    // Fulco's birthday
    if (
      value[0] === '2' &&
      value[1] === '9' &&
      value[3] === '0' &&
      value[4] === '2'
    ) {
      console.log("Fulco's birthday 🎉🎁🎈")
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
                value:
                  // `${
                  //   dateObj.getUTCDate() < 10
                  //     ? '0' + dateObj.getUTCDate()
                  //     : dateObj.getUTCDate()
                  // }
                  `--/${
                    dateObj.getUTCMonth() + 1 < 10
                      ? '0' + (dateObj.getUTCMonth() + 1)
                      : dateObj.getUTCMonth() + 1
                  }/${dateObj.getUTCFullYear()}`,
              },
            })
          }
          e.preventDefault()
          setShowDatePicker(true)
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

      {showDatePicker && (
        <DatePicker
          inputValue={value}
          setInputValue={dateHandler}
          setShowDatePicker={setShowDatePicker}
          setFocused={setFocused}
          clearHandler={clearHandler}
          // voor de date range
          isDateRange={isDateRange}
          fromValue={fromValue}
          tillValue={tillValue}
          setFromValue={setFromValue}
          setTillValue={setTillValue}
          focusOnBeginDate={focusOnBeginDate}
          focusOnEndDate={focusOnEndDate}
          setFocusOnBeginDate={setFocusOnBeginDate}
          setFocusOnEndDate={setFocusOnEndDate}
          style={{ left: isEndDate ? '-100%' : '' }}
        />
      )}
    </div>
  )
}

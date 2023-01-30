import React, { FC, CSSProperties, useState, useEffect } from 'react'
import { Label, usePropState } from '~'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { TimeInput } from './TimeInput'
import { DateInput } from './DateInput'
import { UtcInput } from './UtcInput'
import { DateRangeInput } from './DateRangeInput'

type DateTimePickerProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  onChange?: (value: number) => void
  space?: Space
  style?: CSSProperties
  error?: (value: boolean | string | number) => string
  disabled?: boolean
  value?: string | number
  time?: boolean
  utc?: boolean
  dateRange?: boolean
  onClose?: () => void
}

// const formatYmd = (date) => date?.toISOString().slice(0, 10)
const timezoneOffset = new Date().getTimezoneOffset()

// const nowInMs = new Date().getTime()
// const now = new Date()
// const nowHours = new Date()?.toString().split(' ')[4].substring(0, 5)
// const nowFormatted = formatYmd(new Date(nowInMs))

// console.log('nowInMs', nowInMs)
// console.log('now', now)
// console.log(nowFormatted)
// console.log('now hours', nowHours)
// console.log('WAT IS DIT?', new Date(nowInMs))
// console.log('timezoneOffset -->', timezoneOffset)

export const DateTimePicker: FC<DateTimePickerProps> = ({
  label,
  description,
  descriptionBottom,
  indent,
  onChange,
  space,
  style,
  error,
  dateRange,
  disabled,
  value,
  time,
  utc,
  onClose = () => {},
}) => {
  const [incomingValue, setIncomingValue] = usePropState(value)

  const [focus, setFocus] = useState(false)

  const [dateFormatInput, setDateFormatInput] = useState('')
  const [dateTimeInput, setDateTimeInput] = useState<string>('')
  const [dateUtcInput, setDateUtcInput] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [fromValue, setFromValue] = useState<string>('')
  const [tillValue, setTillValue] = useState<string>('')

  const [blurred, setBlurred] = useState(false)

  useEffect(() => {
    let incomingTime = new Date(incomingValue)
      .toString()
      .split(' ')[4]
      ?.substring(0, 5)

    let incomingDate = new Date(incomingValue)
      .toLocaleString('en-GB')
      .split(',')[0]
      .split('-')
      .join('/')

    if (incomingDate === 'Invalid Date') {
      incomingDate = ''
    }

    //  console.log(incomingDate, incomingTime)

    setDateFormatInput(incomingDate)
    setDateTimeInput(incomingTime)
  }, [incomingValue])

  useEffect(() => {
    if (!dateTimeInput) {
      setDateTimeInput('00:00')
    } else {
      setDateTimeInput(dateTimeInput)
    }
  }, [dateFormatInput])

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput = '00:00') => {
    const dateString = `${dateInput
      .split('/')
      .reverse()
      .join('-')}T${timeInput}`

    const outputMs = new Date(dateString).getTime().toString()

    // console.log('this flippin ', new Date(dateString).getTime().toString())

    //  const msg = error?.(outPutInMs)

    // if (msg && dateTimeInput !== '') {
    //   setErrorMessage(msg)
    // } else {
    //   setErrorMessage('')
    // }

    // if (outPutInMs < new Date(from).getTime()) {
    //   setErrorMessage('Date is before the from date')
    // } else if (outPutInMs > new Date(till).getTime()) {
    //   setErrorMessage('Date is after the till date')
    // }

    // if (!errorMessage) {
    //   onChange(outPutInMs)
    // }

    // if (!dateRange) {
    //   onChange(+outputMs)
    // }

    return outputMs
  }

  const dateHandler = (val) => {
    const tempArr = []
    const day = `${val[0]}${val[1]}`
    const month = `${val[3]}${val[4]}`
    const year = val.substring(6)
    tempArr.push(year, month, day)

    setDateFormatInput(val)
  }

  const timeInputHandler = (val) => {
    if (val.length === 5) {
      setDateTimeInput(val)
    }
  }

  const utcInputHandler = (val) => {
    // onthoud de utc value
    // placeholder is huidige timezone
    // const tempMs = +val.substring(3) * 60 * 60000
    // setUtcInputInMs(tempMs)
    // newMsFromAll(dateFormatInput, dateTimeInput, temp)
  }

  const clearHandler = () => {
    setDateFormatInput('')
    setDateTimeInput('')
    onChange(null)
  }

  useEffect(() => {
    if (!focus && blurred) {
      // this makes sure the onClose fires only once
      setFocus(false)
      console.log('no more focus 💡, onClose FIRES')
      onClose()
    }
  }, [focus])

  // zet de onChange op de nieuwe waarde als de focus er af is
  useEffect(() => {
    if (
      dateRange &&
      fromValue &&
      tillValue &&
      !isNaN(+newMsFromAll(fromValue, '00:00')) &&
      !isNaN(+newMsFromAll(tillValue, '00:00')) &&
      !focus &&
      blurred
    ) {
      console.log('FROM VALUE', fromValue, 'TILL VALUE', tillValue)
      // now set these values in a timestamp
      onClose()
    }

    if (
      !dateRange &&
      !focus &&
      !isNaN(+newMsFromAll(dateFormatInput, dateTimeInput)) &&
      blurred
    ) {
      console.log('onchange FIRES')
      onChange(+newMsFromAll(dateFormatInput, dateTimeInput))
    }
  }, [dateFormatInput, fromValue, tillValue])

  const InputWrapperBlurHandler = () => {
    setBlurred(true)
  }

  return (
    <InputWrapper
      descriptionBottom={descriptionBottom}
      indent={indent}
      space={space}
      errorMessage={errorMessage}
      disabled={disabled}
      style={style}
      onBlur={() => {
        InputWrapperBlurHandler()
      }}
    >
      <Label label={label} description={description} space="12px" />
      {dateRange ? (
        <DateRangeInput
          dateHandler={dateHandler}
          value={dateFormatInput}
          setErrorMessage={setErrorMessage}
          setFromValue={setFromValue}
          setTillValue={setTillValue}
          fromValue={fromValue}
          tillValue={tillValue}
          setFocused={setFocus}
        />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 12 }}>
          <DateInput
            dateHandler={dateHandler}
            value={dateFormatInput}
            setFocused={setFocus}
            clearHandler={clearHandler}
          />
          {time && (
            <TimeInput
              timeInputHandler={timeInputHandler}
              value={dateTimeInput}
              onFocus={setFocus}
              placeholder={dateTimeInput || 'hh:mm'}
            />
          )}
          {utc && (
            <UtcInput
              utcInputHandler={utcInputHandler}
              placeholder={timezoneOffset}
            />
          )}
        </div>
      )}
      {/* <div>miliseconds: {incomingValue}</div> */}
    </InputWrapper>
  )
}

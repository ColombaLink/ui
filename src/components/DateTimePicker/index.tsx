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
}) => {
  const [incomingValue, setIncomingValue] = usePropState(value)

  const [focus, setFocus] = useState(false)

  const [dateFormatInput, setDateFormatInput] = useState('')
  const [dateTimeInput, setDateTimeInput] = useState<string>('')
  const [dateUtcInput, setDateUtcInput] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

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

  // console.log('From -->', from, new Date(from).getTime())
  // console.log('Till -->', till, new Date(till).getTime())
  // console.log('Onchange from datetimepicker', onChange)

  // useEffect(() => {
  //   if (value) {
  //     setDateTimeInput(new Date(value).toString().split(' ')[4].substring(0, 5))
  //     setDateUtcInput(dateUtcInput)

  //     const startDate = new Date(value)
  //     setDateFormatInput(
  //       startDate.toLocaleString('en-GB').split(',')[0].split('-').join('/')
  //     )
  //   }
  // }, [value])

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput) => {
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
    onChange(+outputMs)
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

  return (
    <InputWrapper
      descriptionBottom={descriptionBottom}
      indent={indent}
      space={space}
      errorMessage={errorMessage}
      disabled={disabled}
      style={style}
      // @ts-ignore
      onBlur={() => {
        // console.log('de tijd is: ', dateTimeInput)
        // console.log('de datum is: ', dateFormatInput)
        // console.log(
        //   'output of this:',
        //   newMsFromAll(dateFormatInput, dateTimeInput)
        // )
        newMsFromAll(dateFormatInput, dateTimeInput)
      }}
    >
      <Label label={label} description={description} space="12px" />
      {dateRange ? (
        <DateRangeInput
          dateHandler={dateHandler}
          value={dateFormatInput}
          setErrorMessage={setErrorMessage}
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
      {/* <div>miliseconds: {value}</div> */}
    </InputWrapper>
  )
}

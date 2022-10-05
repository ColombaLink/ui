import React, { FC, CSSProperties, useState, useEffect } from 'react'
import { Label } from '~'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { TimeInput } from './TimeInput'
import { DateInput } from './DateInput'
import { UtcInput } from './UtcInput'

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
  value?: string
}

const formatYmd = (date) => date?.toISOString().slice(0, 10)
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
  disabled,
  value,
}) => {
  const [focus, setFocus] = useState(false)

  const [dateFormatInput, setDateFormatInput] = useState('')
  const [dateTimeInput, setDateTimeInput] = useState<string>('')
  const [dateUtcInput, setDateUtcInput] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  // 2000-12-20

  //  setDateFormatInput()
  // dateHandler(startDate.toLocaleString('en-GB').split(',')[0])
  useEffect(() => {
    if (value) {
      // setDateFormatInput(formatYmd(new Date(value)))
      setDateTimeInput(new Date(value).toString().split(' ')[4].substring(0, 5))
      setDateUtcInput(dateUtcInput)

      const startDate = new Date(value)
      console.log(
        'START',
        startDate.toLocaleString('en-GB').split(',')[0].split('-').join('/')
      )
      setDateFormatInput(
        startDate.toLocaleString('en-GB').split(',')[0].split('-').join('/')
      )
    }
  }, [value])

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput) => {
    console.log('TiME CHANGE??', timeInput)
    console.log('DATEA DAN', dateInput)
    const dateString = `${dateInput
      .split('/')
      .reverse()
      .join('-')}T${timeInput}`
    console.log('DATESTRING', dateString)

    const outPutInMs = new Date(dateString).getTime()

    const msg = error?.(outPutInMs)

    if (msg) {
      setErrorMessage(msg)
    } else {
      setErrorMessage('')
    }

    onChange(outPutInMs)
  }

  const dateHandler = (val) => {
    console.log('VALUE from date handler', val)
    // do output like this -->  2002-10-29
    const tempArr = []
    const day = `${val[0]}${val[1]}`
    const month = `${val[3]}${val[4]}`
    const year = val.substring(6)
    tempArr.push(year, month, day)
    console.log(tempArr.join('-'))
    // datestring new is om de millisecondes te krijgen
    const dateStringNew = tempArr.join('-')

    // als value hou de gewone value??
    setDateFormatInput(val)
    newMsFromAll(dateStringNew, dateTimeInput)
  }

  const timeInputHandler = (val) => {
    setDateTimeInput(val)
    newMsFromAll(dateFormatInput, val)
  }

  const utcInputHandler = (val) => {
    // onthoud de utc value
    // placeholder is huidige timezone
    // const tempMs = +val.substring(3) * 60 * 60000
    //   setUtcInputInMs(tempMs)
    // newMsFromAll(dateFormatInput, dateTimeInput, temp)
  }
  return (
    <InputWrapper
      descriptionBottom={descriptionBottom}
      indent={indent}
      space={space}
      errorMessage={errorMessage}
      focus={focus}
      disabled={disabled}
      style={style}
    >
      <Label label={label} description={description} space="12px" />
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 12 }}>
        <DateInput
          dateHandler={dateHandler}
          value={dateFormatInput}
          setFocused={setFocus}
        />
        <TimeInput
          timeInputHandler={timeInputHandler}
          value={dateTimeInput}
          onFocus={setFocus}
          placeholder={dateTimeInput}
        />
        <UtcInput
          utcInputHandler={utcInputHandler}
          placeholder={timezoneOffset}
        />
      </div>
      <div>miliseconds: {value}</div>
    </InputWrapper>
  )
}

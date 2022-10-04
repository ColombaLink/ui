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

// const nowInMs = new Date().getTime()
// const now = new Date()
// const nowHours = new Date()?.toString().split(' ')[4].substring(0, 5)
// const nowFormatted = formatYmd(new Date(nowInMs))

// console.log('nowInMs', nowInMs)
// console.log('now', now)
// console.log(nowFormatted)
// console.log('now hours', nowHours)
// console.log('WAT IS DIT?', new Date(nowInMs))

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
  const [utcInputInMs, setUtcInputInMs] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  // console.log('The value -->', value)
  // console.log('ERROR', error)

  if (error)
    useEffect(() => {
      if (value) {
        //  console.log('Save the date', new Date(value))
        setDateFormatInput(formatYmd(new Date(value)))
        setDateTimeInput(
          new Date(value).toString().split(' ')[4].substring(0, 5)
        )
        setDateUtcInput(dateUtcInput)
      }
    }, [value])

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput) => {
    // console.log('DATE INPUT', dateInput)
    // console.log('TIME INPUT', timeInput)
    // console.log('UTC INPUT', utcInput)
    // nu nog UTC
    const dateString = `${dateInput}T${timeInput}`
    const outPutInMs = new Date(dateString).getTime() + utcInputInMs

    // console.log('Datestring', dateString)
    // console.log('Output in ms -->', outPutInMs)

    const msg = error?.(outPutInMs)

    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
    }

    onChange(outPutInMs)
  }

  const dateHandler = (val) => {
    setDateFormatInput(val)
    newMsFromAll(val, dateTimeInput)
  }

  const timeInputHandler = (val) => {
    setDateTimeInput(val)
    newMsFromAll(dateFormatInput, val)
  }

  const utcInputHandler = (val) => {
    const tempMs = +val.substring(3) * 60 * 60000
    setUtcInputInMs(tempMs)
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
        <UtcInput utcInputHandler={utcInputHandler} />
      </div>
    </InputWrapper>
  )
}

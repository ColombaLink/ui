import React, { FC, CSSProperties, useState, useEffect } from 'react'
import { Label, usePropState, Space, Row } from '~'
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
  // TODO make it work -> error?: (value: boolean | string | number) => string
  disabled?: boolean
  value?: string | number
  startValue?: string
  endValue?: string
  time?: boolean
  utc?: boolean
  dateRange?: boolean
  onClose?: () => void
}

const timezoneOffset = new Date().getTimezoneOffset()

export const DateTimePicker: FC<DateTimePickerProps> = ({
  label,
  description,
  descriptionBottom,
  indent,
  onChange,
  space,
  style,
  dateRange,
  disabled,
  value,
  startValue,
  endValue,
  time,
  utc,
  onClose = () => {},
}) => {
  const [incomingValue] = usePropState(value)

  const [focus, setFocus] = useState(false)

  const [dateFormatInput, setDateFormatInput] = useState('')
  const [dateTimeInput, setDateTimeInput] = useState<string>('')
  // UTC
  // const [dateUtcInput, setDateUtcInput] = useState('')

  const [errorMessage] = useState('')

  const [fromValue, setFromValue] = useState<string | number>(startValue || '')
  const [tillValue, setTillValue] = useState<string | number>(endValue || '')

  const [blurred, setBlurred] = useState(false)

  useEffect(() => {
    const incomingTime = new Date(incomingValue)
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

    setDateFormatInput(incomingDate)
    setDateTimeInput(incomingTime)
  }, [incomingValue])

  useEffect(() => {
    let incomingStart = new Date(fromValue)
      .toLocaleString('en-GB')
      .split(',')[0]
      .split('-')
      .join('/')

    if (incomingStart === 'Invalid Date') {
      incomingStart = ''
    }

    setFromValue(incomingStart)
  }, [startValue])

  useEffect(() => {
    let incomingEnd = new Date(endValue)
      .toLocaleString('en-GB')
      .split(',')[0]
      .split('-')
      .join('/')

    if (incomingEnd === 'Invalid Date') {
      incomingEnd = ''
    }

    setTillValue(incomingEnd)
  }, [endValue])

  useEffect(() => {
    if (!dateTimeInput) {
      setDateTimeInput('00:00')
    } else {
      setDateTimeInput(dateTimeInput)
    }
  }, [dateFormatInput])

  const newMsFromAll = (dateInput, timeInput = '00:00') => {
    if (isNaN(dateInput)) {
      const dateString = `${dateInput
        .split('/')
        .reverse()
        .join('-')}T${timeInput}`

      const outputMs = new Date(dateString).getTime().toString()

      /// TODO: when error message
      console.log(outputMs)

      return outputMs
    }
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

  // temp utc functie
  const utcInputHandler = () => {}

  // const utcInputHandler = (val ) => {
  // onthoud de utc value
  // placeholder is huidige timezone
  // const tempMs = +val.substring(3) * 60 * 60000
  // setUtcInputInMs(tempMs)
  // newMsFromAll(dateFormatInput, dateTimeInput, temp)
  // }

  const clearHandler = () => {
    setDateFormatInput('')
    setDateTimeInput('')
    onChange(null)
  }

  useEffect(() => {
    if (!focus && blurred) {
      // this makes sure the onClose fires only once
      setFocus(false)
      onClose()
    }
  }, [focus])

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
      // TODO: fix this think about this
      // @ts-ignore
      onChange()

      onClose()
    }

    if (
      !dateRange &&
      !focus &&
      !isNaN(+newMsFromAll(dateFormatInput, dateTimeInput)) &&
      blurred
    ) {
      console.log('FIRE ❤️‍🔥')
      onChange(+newMsFromAll(dateFormatInput, dateTimeInput))
    }
  }, [dateFormatInput, fromValue, tillValue, value])

  const InputWrapperBlurHandler = () => {
    setBlurred(true)
  }

  return (
    // <InputWrapper
    //   descriptionBottom={descriptionBottom}
    //   indent={indent}
    //   space={space}
    //   errorMessage={errorMessage}
    //   disabled={disabled}
    //   style={style}
    //   // @ts-ignore
    //   onBlur={() => {
    //     InputWrapperBlurHandler()
    //   }}
    // >
    //   <Label label={label} description={description} space="12px" />
    <>
      {dateRange ? (
        <DateRangeInput
          setFromValue={setFromValue}
          setTillValue={setTillValue}
          fromValue={fromValue as string}
          tillValue={tillValue as string}
        />
      ) : (
        <Row style={{ gap: 12 }}>
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
        </Row>
      )}
    </>
    // </InputWrapper>
  )
}

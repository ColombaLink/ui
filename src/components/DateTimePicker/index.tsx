import React, { FC, CSSProperties, useState, useEffect } from 'react'
import { color, Select, CalendarIcon, Label, Button } from '~'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { TimeInput } from './TimeInput'
import { DateInput } from './DateInput'
import { UtcInput } from './UtcInput'
import { usePropState } from '~/hooks'

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
  props?: any
}

const nowInMs = new Date().getTime()
const now = new Date()
const nowHours = new Date()?.toString().split(' ')[4].substring(0, 5)
const formatYmd = (date) => date?.toISOString().slice(0, 10)
const nowFormatted = formatYmd(new Date(nowInMs))

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
  props,
}) => {
  console.log('PROPS', props)
  console.log('onchange?', onChange)

  const [msValue, setMsValue] = useState('')
  const [focus, setFocus] = useState(false)

  const [dateFormatInput, setDateFormatInput] = useState()
  const [dateTimeInput, setDateTimeInput] = useState()
  const [dateUtcInput, setDateUtcInput] = useState()

  // useEffect(() => {
  //   if (value) {
  //     setMsValue(value)
  //     console.log('AEFA', new Date(value))
  //     setDateFormatInput(formatYmd(new Date(value)))
  //     setDateTimeInput(
  //       new Date(value)?.toString().split(' ')[4].substring(0, 5)
  //     )
  //     onChange(value)

  //     //  console.log('Formatted', formatYmd(value))
  //     console.log('FIRE')
  //     console.log('MS vAL', msValue)
  //     console.log(value)
  //   }
  // }, [value])

  console.log(value)

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput, utcInput) => {
    const dateString = `${dateInput}T${timeInput}`
    const outPutInMs = new Date(dateString).getTime() + utcInput

    console.log('Datestring', dateString)
    console.log('Output in ms -->', outPutInMs)

    onChange(outPutInMs)
    // return outPutInMs
  }

  const dateHandler = (val) => {
    // console.log('From datehandler', val)
    setDateFormatInput(val)
    newMsFromAll(val, dateTimeInput, dateUtcInput)
  }

  const timeInputHandler = (val) => {
    // console.log('From Timehandler', val)
    setDateTimeInput(val)
    newMsFromAll(dateFormatInput, val, dateUtcInput)
  }

  const utcInputHandler = (val) => {
    // console.log('form utc input handler', val)
    setDateUtcInput(val)
    newMsFromAll(dateFormatInput, dateTimeInput, val)
  }
  return (
    <InputWrapper
      descriptionBottom={descriptionBottom}
      indent={indent}
      space={space}
      // errorMessage={error}
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
          onFocus={() => setFocus(true)}
        />
        <UtcInput utcInputHandler={utcInputHandler} />
      </div>
    </InputWrapper>
  )
}

import React, { FC, CSSProperties, useState } from 'react'
import { color, Select, CalendarIcon, Label, Button } from '~'
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
  value?: number | string
}

const nowInMs = new Date().getTime()
const now = new Date()
console.log('nowInMs', nowInMs)
console.log('now', now)

// ms to --> 1888-10-31 format
const formatYmd = (date) => date?.toISOString().slice(0, 10)
console.log('formatted shizzle ->', formatYmd(new Date(nowInMs)))

// 1888-10-31 --->  to ms

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
  const [ms, setMs] = useState(value)
  const [dateFormatInput, setDateFormatInput] = useState()

  // functions to get the values back
  const newMsFromAll = (dateInput, timeInput, utcInput) => {
    // now return the total ms seconds
  }

  const dateHandler = (val) => {
    console.log('From datehandler', val)
    // return this input in ms seconds
    // and set as dateInput
  }

  return (
    <InputWrapper
      descriptionBottom={descriptionBottom}
      indent={indent}
      space={space}
      // errorMessage={error}
      disabled={disabled}
      style={style}
    >
      <Label label={label} description={description} space="12px" />
      <div
        style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}
      >
        <DateInput dateHandler={dateHandler} />
        <TimeInput />
        <UtcInput />
      </div>
    </InputWrapper>
  )
}

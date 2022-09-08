import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'

export const DateTimePicker = () => {
  let dateObj = new Date()

  const [year, setYear] = useState(dateObj.getFullYear())
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(1)

  const [disabledInputYear, setDisabledInputYear] = useState(false)

  /// value
  /// min
  /// max
  /// onChange
  // step??

  // options -> year, months, days, hours, minutes, seconds, milliseconds

  return (
    <div>
      Date time picker!!!
      <br />
      Dateobj naar string: {dateObj.toLocaleString()}
      <Spacer />
      <div style={{ display: 'flex', gap: 16 }}>
        <Input
          style={{ maxWidth: 280 }}
          placeholder="2001/01/10"
          disabled={disabledInputYear}
        />
        {/* <Input style={{ maxWidth: 100 }} placeholder="00:00" /> */}
        <TimeInput />
        <Input style={{ maxWidth: 160 }} placeholder="UTC+02:00" />
      </div>
      <DatePicker />
    </div>
  )
}

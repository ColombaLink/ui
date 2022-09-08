import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'

export const DateTimePicker = () => {
  let dateObj = new Date()

  const [year, setYear] = useState(dateObj.getFullYear())
  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(1)

  const [disabledInputYear, setDisabledInputYear] = useState(false)

  const [value, setValue] = useState('')
  /// value
  /// min
  /// max
  /// onChange
  // step??

  const tempArr = ['2', '0', '2', '0', '-', '0', '1', '-', '0', '1']

  dateObj.setFullYear(year, month, day)

  const changeYear = (e) => {
    const regDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const regText = /[^a-z]/gi

    console.log(e)

    if (e.length === 0) {
      console.log('selectionStart = 0')
      if (regText.test(e) == false) {
        console.log('nope')
      }
    }

    if (regDate.test(e) || e.length == 4) {
      setYear(e)
    }
  }

  useEffect(() => {
    dateObj.setFullYear(year, month, day)
    console.log('FIREFIEE')
  }, [year, dateObj])

  // options -> year, months, days, hours, minutes, seconds, milliseconds

  return (
    <div>
      Date time picker!!!
      <br />
      Dateobj naar string: {dateObj.toLocaleString()}
      <Spacer />
      <div style={{ display: 'flex', gap: 16 }}>
        <Input
          value={value}
          style={{ maxWidth: 280 }}
          placeholder="2001/01/10"
          onChange={(e) => {
            changeYear(e)
          }}
          disabled={disabledInputYear}
        />
        <Input space style={{ maxWidth: 100 }} placeholder="00:00" />
        <Input space style={{ maxWidth: 160 }} placeholder="UTC+02:00" />
      </div>
      <DatePicker />
    </div>
  )
}

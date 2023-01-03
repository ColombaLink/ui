import React, { useState, useEffect } from 'react'
import { DateInput } from './DateInput'

type DateRangeInputProps = {
  value?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
}

export const DateRangeInput = ({
  value,
  dateHandler,
  setFocused,
  clearHandler,
}: DateRangeInputProps) => {
  const [fromValue, setFromValue] = useState<string>('')
  const [tillValue, setTillValue] = useState<string>('')

  const dateHandlerFrom = (val) => {
    const tempArr = []
    const day = `${val[0]}${val[1]}`
    const month = `${val[3]}${val[4]}`
    const year = val.substring(6)
    tempArr.push(year, month, day)
    setFromValue(val)
  }

  const dateHandlerTill = (val) => {
    const tempArr = []
    const day = `${val[0]}${val[1]}`
    const month = `${val[3]}${val[4]}`
    const year = val.substring(6)
    tempArr.push(year, month, day)
    setTillValue(val)
  }

  const makeAnotherDateForComparison = (val) => {
    const day = `${val[0]}${val[1]}`
    const month = `${val[3]}${val[4]}`
    const year = val.substring(6)

    console.log('TEST: ', `${year}-${month}-${day}`)

    // return de datum in milliseconds
    return Date.parse(`${year}-${month}-${day}`)
  }

  useEffect(() => {
    // compare fromValue and tillValue
    if (
      makeAnotherDateForComparison(fromValue) >
      makeAnotherDateForComparison(tillValue)
    ) {
      console.log('ERROR: fromValue is bigger than tillValue')
    }
  }, [fromValue, tillValue])

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        from:
        <DateInput
          value={fromValue}
          setFocused={() => {}}
          dateHandler={dateHandlerFrom}
          fromValue={fromValue}
          tillValue={tillValue}
        />
        till:
        <DateInput
          value={tillValue}
          setFocused={() => {}}
          dateHandler={dateHandlerTill}
          fromValue={fromValue}
          tillValue={tillValue}
        />
      </div>

      <div style={{ background: 'yellow' }}>
        FROM: {fromValue} - TILL: {tillValue}
      </div>
    </>
  )
}

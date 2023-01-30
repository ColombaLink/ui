import React, { useState, useEffect } from 'react'
import { DateInput } from './DateInput'

type DateRangeInputProps = {
  value?: string
  dateHandler?: (value: string) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
  setErrorMessage?: (value: string) => void
}

export const DateRangeInput = ({
  value,
  dateHandler,
  setFocused,
  clearHandler,
  setErrorMessage,
}: DateRangeInputProps) => {
  const [fromValue, setFromValue] = useState<string>('')
  const [tillValue, setTillValue] = useState<string>('')

  const [focusOnBeginDate, setFocusOnBeginDate] = useState<boolean>(false)
  const [focusOnEndDate, setFocusOnEndDate] = useState<boolean>(false)

  // today
  const dateObj = new Date()

  // const today = `${
  //   dateObj.getUTCDate() < 10
  //     ? '0' + dateObj.getUTCDate()
  //     : dateObj.getUTCDate()
  // }/${
  //   dateObj.getUTCMonth() + 1 < 10
  //     ? '0' + (dateObj.getUTCMonth() + 1)
  //     : dateObj.getUTCMonth() + 1
  // }/${dateObj.getUTCFullYear()}`

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

    // return de datum in milliseconds
    return Date.parse(`${year}-${month}-${day}`)
  }

  // eerste input als velden leeg zijn
  useEffect(() => {
    console.log('fromValue', fromValue)

    if (fromValue[0] === 'N') {
      console.log('fire')
    }

    // bij start
    if (
      !tillValue &&
      typeof +fromValue[0] === 'number' &&
      typeof +fromValue[1] === 'number' &&
      !isNaN(+fromValue[0])
    ) {
      setFocusOnBeginDate(false)
      setFocusOnEndDate(true)
    }
  }, [fromValue])

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          maxWidth: 278,
        }}
      >
        <DateInput
          value={fromValue}
          focusOnBeginDate={focusOnBeginDate}
          setFocusOnBeginDate={setFocusOnBeginDate}
          setFocusOnEndDate={setFocusOnEndDate}
          setFocused={() => {}}
          dateHandler={dateHandlerFrom}
          fromValue={fromValue}
          tillValue={tillValue}
          setFromValue={setFromValue}
          setTillValue={setTillValue}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            width: '100%',
          }}
          placeholder="Start date"
          isDateRange
          onClick={() => {
            setFocusOnBeginDate(true)
            setFocusOnEndDate(false)
          }}
        />

        <DateInput
          value={tillValue}
          focusOnEndDate={focusOnEndDate}
          setFocusOnBeginDate={setFocusOnBeginDate}
          setFocusOnEndDate={setFocusOnEndDate}
          setFocused={() => {}}
          dateHandler={dateHandlerTill}
          fromValue={fromValue}
          tillValue={tillValue}
          setFromValue={setFromValue}
          setTillValue={setTillValue}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          }}
          placeholder="End date"
          isEndDate
          isDateRange
          onClick={() => {
            setFocusOnBeginDate(false)
            setFocusOnEndDate(true)
          }}
        />
      </div>

      {/* <div style={{ background: 'yellow' }}>
        FROM: {fromValue} - TILL: {tillValue}
      </div> */}
    </>
  )
}

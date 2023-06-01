import React, { FC, useState } from 'react'
import { styled, Style, StateProvider } from '~'
import { InputDate } from './InputDate'
import { NewDateInput } from './NewDateInput'

type DateWidgetProps = {
  value?: number // milliseconds
  onChange?: (value: number) => void
  style?: Style
}

// TODO: when error message
// TODO: time input
// TODO: date range component
// TODO: utc input

export const DateWidget: FC<DateWidgetProps> = ({ value, onChange, style }) => {
  // only want one source of truth in milliseconds value
  // TODO deze waarde moet zodalijk aan de onChange gereturned worden
  const [millisecondsValue, setMilliSecondsValue] = useState(value)

  // van string format naar milliseconds
  // const onChangeHandler = (
  //   str: string,
  //   timeInput: string = '00:00'
  // ): number => {
  //   const dateString = `${str?.split('/').reverse().join('-')}T${timeInput}`
  //   const outputMs = new Date(dateString).getTime()
  //   console.log('output in ms ⏱', outputMs)
  //   onChange(outputMs)
  //   return outputMs
  // }

  const MscToString = (value: number): string => {
    const newDate = new Date(value)
    const year = newDate.getFullYear()
    const month =
      newDate.getMonth() + 1 < 10
        ? '0' + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1
    const day =
      newDate.getDate() + 1 < 10 ? '0' + newDate.getDate() : newDate.getDate()

    return `${day}/${month}/${year}`
  }
  // const stringValue = MscToString(value)

  const testDate = new Date(millisecondsValue)

  return (
    <styled.div style={{ ...style }}>
      <div style={{ marginBottom: 32, border: '1px solid red' }}>
        {millisecondsValue} milliseconds <br />
        {new Date(millisecondsValue).toString()}
      </div>
      <StateProvider values={{ val: millisecondsValue }}>
        <NewDateInput
          value={millisecondsValue}
          setValue={setMilliSecondsValue}
        />
        {/* <InputDate value={value} onChangeHandler={onChangeHandler} /> */}
      </StateProvider>
    </styled.div>
  )
}

import React, { useEffect, useState } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import { color, Select, useOverlay, Text } from '~'

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 4,
  minHeight: 36,
  paddingLeft: 12,
  paddingRight: 12,

  cursor: 'text',
  border: `1px solid ${color('border')}`,
  '&::-webkit-calendar-picker-indicator': {
    display: 'none',
  },
  '&[type="date"]::-webkit-input-placeholder': {
    visibility: 'hidden !important',
  },
  '&[type="date"]:input-placeholder': {
    visibility: 'hidden !important',
  },
})

export const DateTimePicker = () => {
  const currentDate = new Date()

  const formatYmd = (date) => date.toISOString().slice(0, 10)
  const formattedDate = formatYmd(currentDate)

  const [inputValue, setInputValue] = useState(formattedDate)
  const [inputTime, setInputTime] = useState('00:00')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [UTCValue, setUTCValue] = useState(0)

  const dateAndTime = `${inputValue}T${inputTime}`

  // console.log('input value', typeof inputValue)

  const dateAndTimeToMiliseconds = new Date(dateAndTime).getTime()
  const outputInMsec = dateAndTimeToMiliseconds + UTCValue

  // formatted date time to miliseconds

  // console.log('to miliseconds ------> ', dateAndTimeToMiliseconds)
  // console.log('offset time zone', new Date(dateAndTime).getTimezoneOffset())

  // console.log('UTC Offset Value', UTCValue)

  // console.log(
  //   ' local offset time zone',
  //   new Date(dateAndTime).getTimezoneOffset() * 60000
  // )

  //   Note that a negative return value from getTimezoneOffset() indicates that the current location is
  // ahead of UTC, while a positive value indicates that the location is behind UTC.

  // console.log(
  //   'milliseconds and offset --> current UTC time in msec',
  //   dateAndTimeToMiliseconds + new Date(dateAndTime).getTimezoneOffset() * 60000
  // )

  // const currentTimeWithOffsetMsec =
  //   dateAndTimeToMiliseconds + new Date(dateAndTime).getTimezoneOffset() * 60000

  // miliseconds to date time
  // const milisecondsToDateAndTime = new Date(dateAndTimeToMiliseconds)
  // console.log('to date and time ------> ', milisecondsToDateAndTime)

  // console.log('blah', new Date(currentTimeWithOffsetMsec).toISOString())

  return (
    <div>
      <div style={{ border: '1px solid red', padding: 12, width: 420 }}>
        Input DATE : {inputValue} | Input Time : {inputTime}
        <br />
        combined output : {dateAndTime}
        <br />
        Output in msec: {outputInMsec}
      </div>
      <Spacer space="28px" />
      <Text space="8px">Date Time</Text>
      <div style={{ display: 'flex', gap: 16 }}>
        <StyledDateInput
          style={{
            maxWidth: 280,
            background: showDatePicker ? color('background2') : '',
            borderBottomLeftRadius: showDatePicker ? 0 : 4,
            borderBottomRightRadius: showDatePicker ? 0 : 4,
          }}
          placeholder="2001/01/10"
          type="date"
          onClick={(e) => {
            //hides the calender in firefox
            e.preventDefault()
            setShowDatePicker(true)
          }}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          value={inputValue}
          onBlur={() => {}}

          // onFocus={useContextMenu(
          //   DatePicker,
          //   { inputValue, setInputValue },
          //   { placement: 'center', width: 280 }
          // )}
        />

        <TimeInput setInputTime={setInputTime} inputTime={inputTime} />

        {/* elke +1 UTC is -60 en elke -1 UTC is +60 */}

        <Select
          style={{ maxWidth: 160, fontWeight: 400, height: 36 }}
          placeholder="UTC-0"
          options={[
            'UTC+0',
            'UTC+1',
            'UTC+2',
            'UTC+3',
            'UTC+4',
            'UTC+5',
            'UTC+6',
            'UTC+7',
            'UTC+8',
            'UTC+9',
            'UTC+10',
            'UTC+11',
            'UTC+12',
            'UTC-1',
            'UTC-2',
            'UTC-3',
            'UTC-4',
            'UTC-5',
            'UTC-6',
            'UTC-7',
            'UTC-8',
            'UTC-9',
            'UTC-10',
            'UTC-11',
            'UTC-12',
          ]}
          onChange={(e) => {
            //  console.log('e', e)
            // @ts-ignore
            // so UTC offset is in minutes
            const tempUTCValMsec = +e.substring(3) * 60 * 60000
            //   console.log(tempUTCValMsec)
            // @ts-ignore
            setUTCValue(tempUTCValMsec)
          }}
        />
      </div>
      {showDatePicker && (
        <DatePicker inputValue={inputValue} setInputValue={setInputValue} />
      )}
    </div>
  )
}

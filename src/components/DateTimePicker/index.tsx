import React, { useEffect, useState, useRef } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import { color, Select, Text, CalendarIcon } from '~'

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 4,
  minHeight: 36,
  paddingLeft: 28,
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

type DateTimePickerProps = {
  label?: string
  description?: string
  onChange?: (value: string) => void
}

export const DateTimePicker = ({
  label,
  description,
  onChange,
}: DateTimePickerProps) => {
  const currentDate = new Date()

  const formatYmd = (date) => date.toISOString().slice(0, 10)
  const formattedDate = formatYmd(currentDate)

  const [inputValue, setInputValue] = useState(formattedDate)
  const [inputTime, setInputTime] = useState('00:00')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [UTCValue, setUTCValue] = useState(0)

  const dateAndTime = `${inputValue}T${inputTime}`
  const dateAndTimeToMiliseconds = new Date(dateAndTime).getTime()
  const outputInMsec = dateAndTimeToMiliseconds + UTCValue

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
      {label && <Text space="8px">{label}</Text>}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <CalendarIcon
            size={14}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: 10,
              left: 10,
            }}
          />
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
          ></StyledDateInput>
        </div>

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
      {description && (
        <div style={{ position: 'absolute' }}>
          <Spacer />
          <Text color="text2" weight={400} italic>
            {description}
          </Text>
        </div>
      )}
      {showDatePicker && (
        <DatePicker
          inputValue={inputValue}
          setInputValue={setInputValue}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
      )}
    </div>
  )
}

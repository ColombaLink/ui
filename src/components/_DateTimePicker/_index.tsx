import React, { useEffect, useState, FC, CSSProperties } from 'react'
import { DatePicker } from './_DatePicker'
import { TimeInput } from './_TimeInput'
import { styled } from 'inlines'
import { color, Select, CalendarIcon, Label, Button } from '~'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'

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
  descriptionBottom?: string
  indent?: boolean
  onChange?: (value: number) => void
  space?: Space
  style?: CSSProperties
  error?: (value: boolean | string | number) => string
  disabled?: boolean
  value?: number | string
}

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
  let currentDate

  if (value) {
    currentDate = new Date(value)
  } else {
    currentDate = new Date()
  }

  const currentTime = currentDate?.toString().split(' ')[4].substring(0, 5)

  const GmtUtcTime =
    'UTC' + currentDate?.toString().split(' ')[5].substring(3, 6)

  // YVES FIX ONCHANGE SAVE VALUE IN SCHEMA

  const formatYmd = (date) => date.toISOString().slice(0, 10)

  const formattedDate = formatYmd(currentDate)

  const [inputValue, setInputValue] = useState(formattedDate)
  const [inputTime, setInputTime] = useState(currentTime)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [UTCValue, setUTCValue] = useState<number>(0)

  const dateAndTime = `${inputValue}T${inputTime}`
  const dateAndTimeToMiliseconds = new Date(dateAndTime).getTime()
  const outputInMsec = dateAndTimeToMiliseconds + UTCValue

  const [focused, setFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const clearAll = () => {
    setInputValue(`yyyyy-mm-dd`)
    setInputTime('00:00')
  }

  useEffect(() => {
    onChange?.(outputInMsec)
    value = outputInMsec

    const msg = error?.(outputInMsec)

    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
    }
  }, [inputValue, inputTime, UTCValue])

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      focus={focused}
      errorMessage={errorMessage}
      descriptionBottom={descriptionBottom}
      style={style}
    >
      <div style={{ cursor: disabled ? 'not-allowed' : 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label
            space="12px"
            label={label}
            description={description}
            labelColor={disabled ? color('text2') : color('text')}
          />

          {!Number.isNaN(outputInMsec) && indent && !disabled && (
            <Button
              ghost
              onClick={() => {
                clearAll()
              }}
              style={{ height: 'fit-content' }}
            >
              Clear
            </Button>
          )}
        </div>
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
                background: showDatePicker
                  ? color('background2')
                  : color('background'),
                color: disabled ? color('text2') : color('text'),
                borderBottomLeftRadius: showDatePicker ? 0 : 4,
                borderBottomRightRadius: showDatePicker ? 0 : 4,
                '&:hover': {
                  cursor: disabled ? 'not-allowed' : 'auto',
                },
              }}
              disabled={disabled}
              placeholder="2001/01/10"
              type="date"
              onClick={(e) => {
                // hides the calender in firefox
                e.preventDefault()
                setShowDatePicker(true)
              }}
              onChange={(e) => {
                setInputValue(e.target.value)
                //   onChange?.(outputInMsec)
              }}
              value={inputValue}
              onFocus={() => setFocused(true)}
            />
            {showDatePicker && (
              <DatePicker
                inputValue={inputValue}
                setInputValue={setInputValue}
                setShowDatePicker={setShowDatePicker}
                setFocused={setFocused}
              />
            )}
          </div>

          <TimeInput
            setInputTime={setInputTime}
            inputTime={inputTime}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
          />

          {/* elke +1 UTC is -60 en elke -1 UTC is +60 */}

          <Select
            id="UTC-id"
            style={{
              maxWidth: 160,
              fontWeight: 400,
              height: 36,
              backgroundColor: disabled
                ? color('background2')
                : color('background'),
              cursor: disabled ? 'not-allowed' : 'auto',
              pointerEvents: disabled ? 'none' : 'auto',
            }}
            placeholder={GmtUtcTime}
            options={[
              'UTC+00',
              'UTC+01',
              'UTC+02',
              'UTC+03',
              'UTC+04',
              'UTC+05',
              'UTC+06',
              'UTC+07',
              'UTC+08',
              'UTC+09',
              'UTC+10',
              'UTC+11',
              'UTC+12',
              'UTC-01',
              'UTC-02',
              'UTC-03',
              'UTC-04',
              'UTC-05',
              'UTC-06',
              'UTC-07',
              'UTC-08',
              'UTC-09',
              'UTC-10',
              'UTC-11',
              'UTC-12',
            ]}
            onChange={(e: any) => {
              // so UTC offset is in minutes
              const tempUTCValMsec = +e.substring(3) * 60 * 60000
              setUTCValue(tempUTCValMsec)
            }}
          />
        </div>
      </div>
    </InputWrapper>
  )
}

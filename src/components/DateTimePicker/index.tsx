import React, { useEffect, useState, useRef, FC, CSSProperties } from 'react'
import { Input } from '../Input'
import { DatePicker } from './DatePicker'
import { Spacer } from '../Spacer'
import { TimeInput } from './TimeInput'
import { styled } from 'inlines'
import {
  color,
  Select,
  Text,
  CalendarIcon,
  spaceToPx,
  Label,
  ErrorIcon,
  Button,
} from '~'
import { Space } from '~/types'

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
  value?: number
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
  const testVal = new Date(value)
  console.log('Test Val --->', testVal)

  let currentDate

  if (value) {
    currentDate = new Date(value)
  } else {
    currentDate = new Date()
  }

  let currentTime = currentDate?.toString().split(' ')[4].substring(0, 5)

  let GmtUtcTime = 'UTC' + currentDate?.toString().split(' ')[5].substring(3, 6)

  console.log('GmtUtcTime -->', GmtUtcTime)

  // console.log('Current Date --->', currentDate)
  // console.log('Current Time --->', currentTime)

  const formatYmd = (date) => date.toISOString().slice(0, 10)

  const formattedDate = formatYmd(currentDate)

  const [inputValue, setInputValue] = useState(formattedDate)
  const [inputTime, setInputTime] = useState(currentTime)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [UTCValue, setUTCValue] = useState(0)

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

    // console.log('The Value --> ', value)

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
    <div
      style={{
        marginBottom: space ? spaceToPx(space) : 16,
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: errorMessage
          ? color('red')
          : focused
          ? color('accent')
          : color('border'),
        paddingLeft: indent ? 12 : null,
        cursor: disabled ? 'not-allowed' : 'auto',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label && (
          <Label
            space="12px"
            label={label}
            description={description}
            labelColor={disabled ? color('text2') : color('text')}
          ></Label>
        )}
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
              background: showDatePicker ? color('background2') : '',
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
              //hides the calender in firefox
              e.preventDefault()
              setShowDatePicker(true)
            }}
            onChange={(e) => {
              setInputValue(e.target.value)

              //   onChange?.(outputInMsec)
            }}
            value={inputValue}
            onFocus={() => setFocused(true)}
          ></StyledDateInput>
          {showDatePicker && (
            <DatePicker
              inputValue={inputValue}
              setInputValue={setInputValue}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              focused={focused}
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
          //@ts-ignore
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
            // @ts-ignore
            // so UTC offset is in minutes
            const tempUTCValMsec = +e.substring(3) * 60 * 60000
            //   console.log(tempUTCValMsec)

            // @ts-ignore
            setUTCValue(tempUTCValMsec)
          }}
        />
      </div>
      {descriptionBottom && (
        <Text color="text2" weight={400} italic style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}
      {/* <ErrorMessage /> */}
      {errorMessage && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <ErrorIcon color="red" size={16} />
          <Text color="red">{errorMessage}</Text>
        </div>
      )}
    </div>
  )
}

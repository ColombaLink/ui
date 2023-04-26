import React, { useRef, FC, useState } from 'react'
import { styled, color, boxShadow, CalendarAltIcon, useContextMenu } from '~'
import { Picker } from './Picker'

const StyledDateInput = styled('input', {
  width: 280,
  borderRadius: 8,
  minHeight: 36,
  paddingLeft: 32,
  paddingRight: 12,
  cursor: 'text',
  border: `1px solid ${color('border')}`,
  boxShadow: boxShadow('medium'),
})

type InputDateProps = {
  value: number
  //   dateHandler?: (value: string) => void
}

const MscToString = (value: number): string => {
  const newDate = new Date(value)
  const year = newDate.getFullYear()
  const month =
    newDate.getMonth() + 1 < 10
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1
  const day =
    newDate.getDate() + 1 < 10
      ? '0' + (newDate.getDate() + 1)
      : newDate.getDate() + 1

  return `${day}/${month}/${year}`
}

export const InputDate: FC<InputDateProps> = ({ value }) => {
  const [valueAsString, setValueAsString] = useState(
    value ? MscToString(value) : null
  )

  const inputRef = useRef<HTMLInputElement | any>(null)
  const dateObj = new Date()

  const dateInputStringFormatHandler = (e) => {
    if (e.target.value.length === 2) {
      e.target.value = e.target.value + '/'
    }
    if (e.target.value.length === 5) {
      e.target.value = e.target.value + '/'
    }

    console.log('>>>>>', e.target.value)
    setValueAsString(e.target.value)
  }

  const handler = useContextMenu(
    Picker,
    {
      valueAsString,
      setValueAsString,
    },
    {
      width: 'target',
    }
  )

  return (
    <styled.div style={{ position: 'relative' }}>
      <CalendarAltIcon
        size={16}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      />
      <StyledDateInput
        ref={inputRef}
        value={valueAsString}
        placeholder="dd/mm/yyyy"
        onChange={(e) => {
          dateInputStringFormatHandler(e)
        }}
        onClick={(e) => {
          if (valueAsString === '') {
            dateInputStringFormatHandler({
              target: {
                value: `--/${
                  dateObj.getUTCMonth() + 1 < 10
                    ? '0' + (dateObj.getUTCMonth() + 1)
                    : dateObj.getUTCMonth() + 1
                }/${dateObj.getUTCFullYear()}`,
              },
            })
          }
          e.preventDefault()
          //   setShowDatePicker(true)
          handler(e)
        }}
      />
    </styled.div>
  )
}

import React, { useRef, FC, useState } from 'react'
import { styled, color, boxShadow, CalendarAltIcon, useContextMenu } from '~'

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

export const InputDate: FC<InputDateProps> = ({ value }) => {
  const inputRef = useRef<HTMLInputElement | any>(null)
  const dateObj = new Date()

  const dateInputStringFormatHandler = (e) => {
    if (e.target.value.length === 2) {
      e.target.value = e.target.value + '/'
    }
    if (e.target.value.length === 5) {
      e.target.value = e.target.value + '/'
    }
    // dateHandler(e.target.value)
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

  const [valueAsString, setValueAsString] = useState(MscToString(value))

  //   const dateHandler = (val) => {
  //     const tempArr = []
  //     const day = `${val[0]}${val[1]}`
  //     const month = `${val[3]}${val[4]}`
  //     const year = val.substring(6)
  //     tempArr.push(year, month, day)

  //     // setDateFormatInput(val)
  //     console.log('------>', val)
  //   }

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
        value={value}
        placeholder="Select a date"
        onChange={(e) => {
          dateInputStringFormatHandler(e)
        }}
        onClick={(e) => {
          if (value === '') {
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
          //  handler(e)
        }}
      />
    </styled.div>
  )
}

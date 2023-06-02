import React, { useRef, FC, useState, useEffect } from 'react'
import {
  styled,
  color,
  boxShadow,
  CalendarAltIcon,
  useContextState,
  useOverlay,
} from '~'
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
  onChangeHandler?: (e) => void
  //   dateHandler?: (value: string) => void
}

export const InputDate: FC<InputDateProps> = ({ value, onChangeHandler }) => {
  // const [valueAsString, setValueAsString] = useState(
  //   value ? MscToString(value) : null
  // )
  const [localFocus, setLocalFocus] = useState(false)

  const inputRef = useRef<HTMLInputElement | any>(null)

  const [valueAsString, setValueAsString] = useContextState('value')

  console.log('--> from inputDate 🫅', valueAsString)
  // console.log('--> flipper flapper 👩‍🚀', MscToString(test))

  // so if this value change fire onchange
  useEffect(() => {
    onChangeHandler(valueAsString)
    setValueAsString(valueAsString)
  }, [valueAsString])

  const dateInputStringFormatHandler = (e) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '$1/$2')
    value = value.replace(/(\d)(\d{4})$/, '$1/$2')
    setValueAsString(value)
  }

  const openPicker = useOverlay(
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
          e.preventDefault()
          openPicker(e)
        }}
        onFocus={() => setLocalFocus(true)}
        onBlur={() => setLocalFocus(false)}
        style={{
          backgroundColor: localFocus
            ? color('background2')
            : color('background'),
          borderBottomLeftRadius: localFocus ? 0 : 8,
          borderBottomRightRadius: localFocus ? 0 : 8,
        }}
      />
    </styled.div>
  )
}

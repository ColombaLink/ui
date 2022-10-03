import React, { FC, CSSProperties } from 'react'
import { styled } from 'inlines'
import { color } from '~'

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

type DateInputProps = {
  onChange?: (value: number) => void
  style?: CSSProperties
  error?: (value: boolean | string | number) => string
  value?: number | string
  placeholder?: string
  dateHandler?: (value: string) => void
}

export const DateInput: FC<DateInputProps> = ({
  value,
  placeholder,
  onChange,
  dateHandler,
}) => {
  return (
    <StyledDateInput
      type="date"
      onChange={(e) => {
        dateHandler(e.target.value)
        //    console.log(e.target.value)
      }}
    />
  )
}

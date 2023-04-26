import React, { FC, useState, useEffect } from 'react'
import { styled, Style } from '~'
import { InputDate } from './InputDate'

type DateProps = {
  value?: number // milliseconds
  onChange?: (value: number) => void
  style?: Style
}

export const Date: FC<DateProps> = ({ value, onChange, style }) => {
  return (
    <>
      <InputDate value={value} />
    </>
  )
}

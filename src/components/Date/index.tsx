import React, { FC } from 'react'
import { styled, Style } from '~'
import { InputDate } from './InputDate'

type DateWidgetProps = {
  value?: number // milliseconds
  onChange?: (value: number) => void
  style?: Style
}

export const DateWidget: FC<DateWidgetProps> = ({ value, onChange, style }) => {
  const onChangeHandler = (
    str: string,
    timeInput: string = '00:00'
  ): number => {
    const dateString = `${str.split('/').reverse().join('-')}T${timeInput}`
    const outputMs = new Date(dateString).getTime()

    /// TODO: when error message
    console.log('output in ms ⏱', outputMs)
    onChange(outputMs)
    return outputMs
  }

  return (
    <styled.div style={{ ...style }}>
      <InputDate value={value} onChangeHandler={onChangeHandler} />
    </styled.div>
  )
}

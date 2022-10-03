import React from 'react'
import { Input } from '../Input'
import { color } from '~'

export const TimeInput = ({ time, disabled }) => {
  return (
    <Input
      value={time}
      type="text"
      //   onKeyPress={keyPressHandler}
      //   onChange={timeHandler}
      placeholder="00:00"
      //   onFocus={() => onFocus()}
      //   onBlur={onBlur}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? color('background2') : color('background'),
      }}
    />
  )
}

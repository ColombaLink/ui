import React, { useState, useEffect } from 'react'
import { Input } from '../Input'
import { color } from '~'

export const TimeInput = ({
  timeInputHandler,
  value,
  onFocus,
  placeholder,
}) => {
  const [time, setTime] = useState(value)
  const [validTimeInput, setValidTimeInput] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

  useEffect(() => {
    if (time?.length === 6) {
      setTime(time?.slice(0, -1))
    }
    //  check if regex matches
    if (timeRegex.test(time) && time.length === 5) {
      setValidTimeInput(true)
      setTime(time)
      timeInputHandler(time)
    } else {
      setValidTimeInput(false)
    }
  }, [time])

  const timeHandler = (e) => {
    if (e.length === 2) {
      timeInputHandler(e)
      setTime(e + ':')
    } else {
      setTime(e)
    }
  }

  const keyPressHandler = (e) => {
    if (isNaN(e.key)) {
      console.log('not number')
      e.preventDefault()
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Input
        value={time}
        type="text"
        onKeyPress={keyPressHandler}
        onChange={timeHandler}
        placeholder={placeholder}
        onFocus={() => {
          setIsFocus(true)
          onFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
          onFocus(false)
        }}
      />
      {isFocus && (
        <div
          style={{
            border: `2px solid ${color('accent')}`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
          }}
        />
      )}
    </div>
  )
}

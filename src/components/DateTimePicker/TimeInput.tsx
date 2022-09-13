import React, { useEffect, useState } from 'react'
import { Input, color } from '~'

export const TimeInput = ({ inputTime, setInputTime }) => {
  const [time, setTime] = useState('')
  const [validTimeInput, setValidTimeInput] = useState(false)

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

  useEffect(() => {
    if (time.length === 6) {
      setTime(time.slice(0, -1))
    }
    //check if regex matches
    if (timeRegex.test(time) && time.length === 5) {
      setValidTimeInput(true)
      setInputTime(time)
    } else {
      setValidTimeInput(false)
    }
  }, [time])

  const timeHandler = (e) => {
    if (e.length === 2) {
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
        placeholder="00:00"
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 4,
          border:
            !validTimeInput && time.length === 5
              ? `2px solid ${color('red')}`
              : '',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  )
}

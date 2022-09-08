import React, { useEffect, useState } from 'react'
import { Input } from '~'

export const TimeInput = ({}) => {
  const [time, setTime] = useState('')

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

  useEffect(() => {
    if (time.length === 6) {
      setTime(time.slice(0, -1))
    }
  }, [time])

  const timeHandler = (e) => {
    if (e.length === 2) {
      console.log('length', e)
      setTime(e + ':')
    } else {
      setTime(e)
    }

    console.log('from time handler', e)
  }

  const keyPressHandler = (e) => {
    if (isNaN(e.key)) {
      console.log('not number')
      e.preventDefault()
    }
  }

  return (
    <div>
      <Input
        value={time}
        type="text"
        onKeyPress={keyPressHandler}
        onChange={timeHandler}
        placeholder="00:00"
      />
    </div>
  )
}

import React, { FC, useState } from 'react'
import { styled, Style, StateProvider } from '~'
import { NewDateInput } from './NewDateInput'

type DateWidgetProps = {
  value?: number // milliseconds
  onChange?: (value: number) => void
  time?: boolean
  style?: Style
}

// TODO: when error message
// TODO: time input
// TODO: date range component
// TODO: utc input
// TODO: schikkeljaar

export const DateWidget: FC<DateWidgetProps> = ({
  value,
  onChange,
  time,
  style,
}) => {
  // only want one source of truth in milliseconds value
  // TODO deze waarde moet zodalijk aan de onChange gereturned worden
  const [millisecondsValue, setMilliSecondsValue] = useState(value)

  return (
    <styled.div style={{ ...style }}>
      <div style={{ marginBottom: 32, border: '1px solid red' }}>
        {millisecondsValue} milliseconds <br />
        {new Date(millisecondsValue).toString()}
      </div>
      <StateProvider values={{ val: millisecondsValue }}>
        <NewDateInput
          value={millisecondsValue}
          setValue={setMilliSecondsValue}
          time={time}
        />
      </StateProvider>
    </styled.div>
  )
}

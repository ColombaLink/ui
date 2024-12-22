import { FC, useEffect, useState } from 'react'
import { styled, Style, StateProvider } from '~'
import { NewDateInput } from './NewDateInput'

type DateWidgetProps = {
  value?: number // milliseconds
  onChange: (value: number) => void
  time?: boolean
  style?: Style
}

// TODO: when error message
// TODO: hover range ??

export const DateWidget: FC<DateWidgetProps> = ({
  value,
  onChange,
  time,
  style,
}) => {
  const [millisecondsValue, setMilliSecondsValue] = useState(value)

  useEffect(() => {
    onChange(millisecondsValue)
  }, [millisecondsValue])

  return (
    <styled.div style={{ ...style }}>
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

import React, { useState, useEffect } from 'react'
import { styled } from 'inlines'
import { StateProvider } from '~/hooks'
import { DateRangeDoubleInput } from './DaterRangeDoubleInput'

type DateRangeWidgetProps = {
  value?: number[]
  onChange: (value: number[]) => void
}

export const DateRangeWidget = ({ value, onChange }: DateRangeWidgetProps) => {
  const [fromMscValue, setfromMscValue] = useState(value[0])
  const [tillMscValue, setTillMscValue] = useState(value[1])

  useEffect(() => {
    onChange([fromMscValue, tillMscValue])
  }, [fromMscValue, fromMscValue])

  return (
    <styled.div>
      <div style={{ background: 'pink', marginBottom: 20 }}>
        from value: {fromMscValue} - {new Date(fromMscValue).toString()} <br />
        till value: {tillMscValue} - {new Date(tillMscValue).toString()}
      </div>

      <styled.div style={{ display: 'flex' }}>
        <StateProvider
          values={{ fromValue: fromMscValue, tillValue: tillMscValue }}
        >
          <DateRangeDoubleInput
            fromValue={fromMscValue}
            tillValue={tillMscValue}
            setFromValue={setfromMscValue}
            setTillValue={setTillMscValue}
          />
        </StateProvider>
      </styled.div>
    </styled.div>
  )
}

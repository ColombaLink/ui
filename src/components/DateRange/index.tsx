import React, { useState, useEffect } from 'react'
import { styled } from 'inlines'
import { StateProvider } from '~/hooks'
import { DateRangeDoubleInput } from './DateRangeDoubleInput'

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

import React, { useState } from 'react'
import { styled } from 'inlines'
import { StateProvider } from '~/hooks'
import { NewDateInput } from '../Date/NewDateInput'

type DateRangeWidgetProps = {
  value?: number[]
}

export const DateRangeWidget = ({ value }: DateRangeWidgetProps) => {
  // console.log(value)

  const [fromMscValue, setfromMscValue] = useState(value[0])
  const [tillMscValue, setTillMscValue] = useState(value[1])

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
          <NewDateInput
            value={fromMscValue}
            setValue={setfromMscValue}
            style={{
              maxWidth: 139,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            isFromRange
          />

          <NewDateInput
            value={tillMscValue}
            setValue={setTillMscValue}
            style={{
              maxWidth: 139,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              marginLeft: -5,
            }}
            isTillRange
          />
        </StateProvider>
      </styled.div>
    </styled.div>
  )
}

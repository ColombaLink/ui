import React from 'react'
import { Select } from '~'

export const UtcInput = ({ utcInputHandler, placeholder }) => {
  // placeholder to UTC+ Value
  let utcValue
  if (placeholder) {
    const tempRes = placeholder / 60

    if (tempRes < 0) {
      utcValue = 'UTC+' + tempRes.toString().substring(1)
    } else if (tempRes > 0) {
      utcValue = 'UTC-' + tempRes.toString().substring(1)
    }
  }

  return (
    <Select
      id="UTC-id"
      style={{
        maxWidth: 160,
        fontWeight: 400,
        height: 36,
      }}
      placeholder={utcValue}
      options={[
        'UTC+0',
        'UTC+1',
        'UTC+2',
        'UTC+3',
        'UTC+4',
        'UTC+5',
        'UTC+6',
        'UTC+7',
        'UTC+8',
        'UTC+9',
        'UTC+10',
        'UTC+11',
        'UTC+12',
        'UTC-1',
        'UTC-2',
        'UTC-3',
        'UTC-4',
        'UTC-5',
        'UTC-6',
        'UTC-7',
        'UTC-8',
        'UTC-9',
        'UTC-10',
        'UTC-11',
        'UTC-12',
      ]}
      onChange={(e: any) => {
        // so UTC offset is in minutes
        utcInputHandler(e)
      }}
    />
  )
}

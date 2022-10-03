import React from 'react'
import { Select } from '~'

export const UtcInput = () => {
  return (
    <Select
      id="UTC-id"
      style={{
        maxWidth: 160,
        fontWeight: 400,
        height: 36,
        // backgroundColor: disabled ? color('background2') : color('background'),
        // cursor: disabled ? 'not-allowed' : 'auto',
        // pointerEvents: disabled ? 'none' : 'auto',
      }}
      placeholder="UTC+00"
      options={[
        'UTC+00',
        'UTC+01',
        'UTC+02',
        'UTC+03',
        'UTC+04',
        'UTC+05',
        'UTC+06',
        'UTC+07',
        'UTC+08',
        'UTC+09',
        'UTC+10',
        'UTC+11',
        'UTC+12',
        'UTC-01',
        'UTC-02',
        'UTC-03',
        'UTC-04',
        'UTC-05',
        'UTC-06',
        'UTC-07',
        'UTC-08',
        'UTC-09',
        'UTC-10',
        'UTC-11',
        'UTC-12',
      ]}
      onChange={(e: any) => {
        // so UTC offset is in minutes
        const tempUTCValMsec = +e.substring(3) * 60 * 60000
        //   setUTCValue(tempUTCValMsec)
      }}
    />
  )
}

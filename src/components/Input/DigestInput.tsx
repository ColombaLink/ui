import React, { useEffect, useState } from 'react'
import { Input } from '.'
import { EyeIcon, EyeBlockedIcon, color } from '~'
// import { usePropState } from '~/hooks'

type DigestInputProps = {
  value?: string
  onChange?: (target) => void
  props?: any
}

export const DigestInput = ({ value, onChange, props }: DigestInputProps) => {
  const [digestInputType, setDigestInputType] = useState('password')

  // const [topValue] = usePropState(value)
  // console.log(value)

  // useEffect(() => {
  //   console.log('once -->', value)
  // }, [])

  // useEffect(() => {
  //   console.log('top value changed', topValue)
  //   // onChange(topValue)
  // }, [topValue])

  return (
    <div
      style={{ display: 'flex', position: 'relative', alignItems: 'center' }}
    >
      <Input
        {...props}
        style={{ width: '100%' }}
        type={digestInputType}
        value={value}
        onChange={(e) => {
          // console.log('e', e)
          onChange({ target: { value: e } })
        }}
      />

      {digestInputType === 'text' && (
        <EyeIcon
          size={24}
          style={{
            position: 'absolute',
            right: 6,
            cursor: 'pointer',
            border: `3px solid ${color('background')}`,
            backgroundColor: color('background'),
          }}
          onClick={() => setDigestInputType('password')}
        />
      )}
      {digestInputType === 'password' && (
        <EyeBlockedIcon
          size={24}
          style={{
            position: 'absolute',
            right: 6,
            cursor: 'pointer',
            backgroundColor: color('background'),
            border: `3px solid ${color('background')}`,
          }}
          onClick={() => setDigestInputType('text')}
        />
      )}
    </div>
  )
}

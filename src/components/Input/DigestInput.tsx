import React, { useEffect, useState } from 'react'
import { Input } from '.'
import { Text, EyeIcon, EyeBlockedIcon } from '~'
import { usePropState } from '~/hooks'

type DigestInputProps = {
  value?: string
  onChange?: (value: string | number | null) => void
  props?: any
}

export const DigestInput = ({ value, onChange, props }: DigestInputProps) => {
  const [digestType, setDigestType] = useState('password')

  // change if value from top changes
  const [topValue] = usePropState(value)

  useEffect(() => {
    console.log('top value changed', topValue)
  }, [topValue])

  return (
    <div
      style={{ display: 'flex', position: 'relative', alignItems: 'center' }}
    >
      <Input
        {...props}
        style={{ width: '100%' }}
        type={digestType}
        value={topValue}
      />
      {/* // onclick should change the input type to text from password */}
      {digestType === 'password' && (
        <EyeIcon
          style={{ position: 'absolute', right: 12, cursor: 'pointer' }}
          onClick={() => setDigestType('text')}
        />
      )}
      {digestType === 'text' && (
        <EyeBlockedIcon
          style={{ position: 'absolute', right: 12, cursor: 'pointer' }}
          onClick={() => setDigestType('password')}
        />
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { Input } from '.'
import { EyeIcon, EyeBlockedIcon, color } from '~'

type DigestInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
}

export const DigestInput = ({
  value,
  onChange,
  disabled,
  ...props
}: DigestInputProps) => {
  const [digestInputType, setDigestInputType] = useState('password')

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Input
        {...props}
        style={{ width: '100%' }}
        type={digestInputType}
        value={value}
        onChange={(e) => {
          onChange({ target: { value: e } })
        }}
        disabled={disabled}
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

import React, { useState } from 'react'
import { Input, EyeIcon, EyeBlockedIcon, LockIcon, color } from '~'

type PasswordInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
}

export const PasswordInput = ({
  value,
  onChange,
  disabled,
  ...props
}: PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState('password')

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
        icon={<LockIcon />}
        style={{ width: '100%' }}
        type={passwordInputType}
        value={value}
        onChange={(e) => {
          onChange({ target: { value: e } })
        }}
        disabled={disabled}
      />

      {passwordInputType === 'text' && (
        <EyeIcon
          size={24}
          style={{
            position: 'absolute',
            right: 6,
            cursor: 'pointer',
            border: `3px solid ${color('background')}`,
            backgroundColor: color('background'),
          }}
          onClick={() => setPasswordInputType('password')}
        />
      )}
      {passwordInputType === 'password' && (
        <EyeBlockedIcon
          size={24}
          style={{
            position: 'absolute',
            right: 6,
            cursor: 'pointer',
            backgroundColor: color('background'),
            border: `3px solid ${color('background')}`,
          }}
          onClick={() => setPasswordInputType('text')}
        />
      )}
    </div>
  )
}

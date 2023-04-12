import React, { useState } from 'react'
import { EyeIcon, EyeBlockedIcon, color, Single } from '~'

type PasswordInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
  large?: boolean
}

export const PasswordInput = ({
  value,
  onChange,
  disabled,
  large,
  ...props
}: PasswordInputProps) => {
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : '',
      }}
    >
      <Single
        type={passwordInputType}
        // value={value}
        // @ts-ignore
        style={{ ...props?.style, paddingLeft: 32, minHeight: large ? 48 : 36 }}
        onChange={(e) => {
          onChange({ target: { value: e } })
        }}
      />

      {passwordInputType === 'text' && (
        <EyeIcon
          size={24}
          style={{
            position: 'absolute',
            left: 6,
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
            left: 6,
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

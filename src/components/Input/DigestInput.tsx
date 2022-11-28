import React, { useState } from 'react'
import { CheckIcon, CopyIcon } from '~/icons'
import { Input, Text } from '~'

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
  const [shortState, setShortState] = useState(true)
  const [copied, setCopied] = useState(false)

  function copy(text) {
    const input = document.createElement('input')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    const result = document.execCommand('copy')
    document.body.removeChild(input)
    return result
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        {shortState}
        <Input
          icon=" "
          {...props}
          style={{ width: '100%' }}
          type="text"
          value={value}
          onChange={(e) => {
            onChange({ target: { value: e } })
          }}
          disabled={disabled}
          onClick={() => {
            console.log('click')
            console.log('shortState: ', shortState)
            setShortState(!shortState)
          }}
        />
        <CopyIcon
          style={{ position: 'absolute', left: 12, cursor: 'pointer' }}
          onClick={() => {
            copy(value)
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 3500)
          }}
        />
      </div>
      {copied && (
        <div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            marginTop: 12,
            marginBottom: -24,
          }}
        >
          <CheckIcon color="green" />
          <Text>Copied full SHA!!</Text>
        </div>
      )}
    </>
  )
}

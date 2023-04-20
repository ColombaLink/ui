import React, { useEffect, useState } from 'react'
import {
  Input,
  renderOrCreateElement,
  Text,
  CheckIcon,
  CopyIcon,
  styled,
} from '~'

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
  const [shortState, setShortState] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (value.length > 6) {
      setShortState(true)
    }
  }, [])

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
      <styled.div
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
        }}
        onBlur={() => {
          if (value.length > 6) {
            setShortState(true)
          }
        }}
        onFocus={() => {
          setShortState(false)
        }}
      >
        {shortState ? (
          <Input
            type="text"
            value={value.substring(0, 6) + '...'}
            icon={renderOrCreateElement(' ')}
            style={{ width: '100%' }}
          />
        ) : (
          <Input
            icon={renderOrCreateElement(' ')}
            {...props}
            style={{ width: '100%' }}
            type="text"
            value={value}
            onChange={(e) => {
              onChange({ target: { value: e } })
            }}
            disabled={disabled}
          />
        )}
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
      </styled.div>
      {copied && (
        <styled.div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            marginTop: 12,
            paddingBottom: 6,
            marginBottom: -24,
          }}
        >
          <CheckIcon color="green" />
          <Text>Copied full SHA!!</Text>
        </styled.div>
      )}
    </>
  )
}

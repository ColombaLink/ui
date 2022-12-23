import React, { useEffect, useState } from 'react'
import { Input } from '.'
import { Text } from '~'

type CustomRegexInputProps = {
  pattern?: string
  setErrorMessage?: (errorMessage: string) => void
  errorMessage?: string
  value?: string
  onChange?: (value: string | number | null) => void
}

export const CustomRegexInput = ({
  pattern,
  setErrorMessage,
  errorMessage,
  value,
  onChange,
}: CustomRegexInputProps) => {
  const [val, setVal] = useState(value || '')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (val.length > 1) {
      if (new RegExp(pattern).test(val)) {
        setIsValid(true)
        setErrorMessage('')
      } else {
        setIsValid(false)
        setErrorMessage(errorMessage || 'Does not match REGEX/pattern')
      }
    }
  }, [val])

  return (
    <div>
      <Input
        value={val}
        onChange={(e) => {
          setVal(e)
        }}
        space="8px"
      />
    </div>
  )
}

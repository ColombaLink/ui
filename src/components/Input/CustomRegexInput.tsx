import React, { useState } from 'react'
import { Input } from '.'

type CustomRegexInputProps = {
  pattern?: string
  errorMessage?: string
  value?: string
  onChange?: (target) => void
}

export const CustomRegexInput = ({
  pattern,
  errorMessage,
  value,
  onChange,
}: CustomRegexInputProps) => {
  const [val, setVal] = useState(value || '')

  return (
    <div>
      <Input
        value={val}
        onChange={(e) => {
          setVal(e)
          onChange({ target: { value: e } })
        }}
        space="8px"
        error={(val) => {
          if (new RegExp(pattern).test(val) || val.length < 1) {
            return ''
          }
          return errorMessage || 'Does not match REGEX/pattern'
        }}
      />
    </div>
  )
}

import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { styled } from 'inlines'
import { color, Text, Input } from '~'
import Editor from '../Code/ReactSImpleEditor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'

const StyledJsonEditor = styled('div', {
  border: `1px solid ${color('border')}`,
  borderRadius: 4,
})

type JsonInputProps = {
  value?: string
  onChange?: (value: string) => void
  setErrorMessage?: (value: string) => void
}

export const JsonInput = ({
  value,
  onChange,
  setErrorMessage,
}: JsonInputProps) => {
  const [code, setCode] = useState(value)
  const [valid, setValid] = useState(true)

  const isValidJson = (str) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (!valid) {
      setErrorMessage('Invalid JSON')
    } else {
      //   setErrorMessage('')
      //  setCode(JSON.stringify(JSON.parse(code), null, 2))
    }
  }, [valid])

  return (
    <StyledJsonEditor>
      <div
        style={{
          padding: 12,
          backgroundColor: color('background2'),
          borderRadius: 4,
        }}
      >
        <Text color="text2">JSON Editor</Text>
        {valid}
      </div>

      <div style={{ padding: 12 }}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(tempCode) => {
            try {
              const h = highlight(tempCode, languages.json)

              return h
            } catch (err) {}
          }}
          style={{
            fontSize: 14,
            color: color('accent'),
            fontFamily: 'Fira Code, monospace, sans-serif',
          }}
          onBlur={() => {
            setValid(isValidJson(code))
            setCode(JSON.stringify(JSON.parse(code), null, 2))
            if (isValidJson(code)) {
              //@ts-ignore
              onChange({ target: { value: JSON.stringify(code) } })
              console.log('on changed fired from json input')
            }
          }}
          onFocus={() => {
            setValid(true)
            setErrorMessage('')
          }}
        />
      </div>
    </StyledJsonEditor>
  )
}

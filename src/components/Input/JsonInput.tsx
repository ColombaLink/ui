import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  // ChangeEvent,
} from 'react'
import { styled } from 'inlines'
import { color, Text } from '~'
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
  onChange?: (target) => void
  setErrorMessage?: (value: string) => void
  clearValue?: boolean
  setClearValue?: Dispatch<SetStateAction<boolean>>
  // showJSONClearButton?: boolean
  setShowJSONClearButton?: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
}

export const JsonInput = ({
  value,
  onChange,
  setErrorMessage,
  clearValue,
  setClearValue,
  // showJSONClearButton,
  setShowJSONClearButton,
  disabled,
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
    if (!valid && code !== '') {
      setErrorMessage('Invalid JSON')
      // console.log(code.length)
    } else {
      //  setErrorMessage('')
      //  setCode(JSON.stringify(JSON.parse(code), null, 2))
    }
  }, [valid])

  useEffect(() => {
    setCode('')
    setClearValue(false)
  }, [clearValue])

  return (
    <StyledJsonEditor style={{ cursor: disabled ? 'not-allowed' : null }}>
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

      <div style={{ padding: 12, pointerEvents: disabled ? 'none' : null }}>
        <Editor
          value={code}
          onValueChange={(code) => {
            // console.log(code.length)
            if (code.length > 0) {
              setShowJSONClearButton(true)
            } else {
              setShowJSONClearButton(false)
            }

            setCode(code)
          }}
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
              // TODO dont do on blur
              const stringified = JSON.stringify(code)
              onChange({ target: { value: stringified } })
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

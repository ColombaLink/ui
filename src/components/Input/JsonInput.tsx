import { useState } from 'react'
import { color, Text, usePropState, styled } from '~'
import Editor from '../Code/ReactSImpleEditor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
// import './jsonInputSyntax.css'

const StyledJsonEditor = styled('div', {
  border: `1px solid ${color('border')}`,
  borderRadius: 4,
})

type JsonInputProps = {
  value?: string
  onChange?: (target) => void
  setErrorMessage?: (value: string) => void
  disabled?: boolean
}

export const JsonInput = ({
  value,
  onChange,
  setErrorMessage,
  disabled,
}: JsonInputProps) => {
  const [code, setCode] = usePropState(value)
  const [valid, setValid] = useState(true)

  const isValidJson = (str) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  return (
    <StyledJsonEditor style={{ cursor: disabled ? 'not-allowed' : null }}>
      <styled.div
        style={{
          padding: 12,
          backgroundColor: color('background2'),
          borderRadius: 4,
        }}
      >
        <Text color="text2">JSON Editor</Text>
        {valid}
      </styled.div>

      <styled.div
        style={{ padding: 12, pointerEvents: disabled ? 'none' : null }}
      >
        <Editor
          onBlur={() => {
            if (!valid && code !== '' && code.length > 0) {
              setErrorMessage('Invalid JSON')
              // console.log(code.length)
            } else {
              setCode(JSON.stringify(JSON.parse(code), null, 2))
              setErrorMessage('')
            }
          }}
          value={code}
          onValueChange={(code) => {
            setCode(code)
            // console.log(code.length)

            if (code.length > 0) {
              if (isValidJson(code)) {
                onChange({ target: { value: code } })
                setValid(true)
              } else if (!isValidJson(code)) {
                setValid(false)
              }
            }
          }}
          highlight={(tempCode) => {
            try {
              const h = highlight(tempCode, languages.json)
              return h
            } catch (err) {
              console.log(err)
            }
          }}
          style={{
            fontSize: 14,
            color: color('accent'),
            fontFamily: 'Fira Code, monospace, sans-serif',
          }}
        />
      </styled.div>
    </StyledJsonEditor>
  )
}

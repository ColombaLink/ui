import React, { useState } from 'react'
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

export const JsonInput = () => {
  const [code, setCode] = useState('')

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
      </div>

      <div style={{ padding: 12 }}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => {
            try {
              const h = highlight(code, languages.js)

              return h
            } catch (err) {}
          }}
          style={{
            fontSize: 14,
            color: color('accent'),
            fontFamily: 'Fira Code, monospace, sans-serif',
          }}
        />
      </div>

      <div>
        <Text>Json stringified: {JSON.stringify(code)}</Text>
      </div>
    </StyledJsonEditor>
  )
}

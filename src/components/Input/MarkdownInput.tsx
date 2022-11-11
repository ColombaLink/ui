import React, { useState } from 'react'
import { styled } from 'inlines'
import { color, Text } from '~'
import Editor from '../Code/ReactSImpleEditor'
import { highlight, languages } from 'prismjs/components/prism-core'

const StyledMarkdownInput = styled('div', {
  border: `1px solid ${color('border')}`,
  borderRadius: 4,
})

type MarkdownInputProps = {
  value?: string
  onChange?: (target) => void
  disabled?: boolean
}

export const MarkdownInput = ({
  value,
  onChange,
  disabled,
}: MarkdownInputProps) => {
  const [code, setCode] = useState(value)

  return (
    <StyledMarkdownInput>
      <div
        style={{
          backgroundColor: color('background2'),
          borderRadius: 4,
          padding: 12,
        }}
      >
        <Text color="text2">Markdown Editor</Text>
      </div>

      <div style={{ padding: 12, pointerEvents: disabled ? 'none' : null }}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.markup, 'markup')}
          style={{
            fontSize: 14,
            color: color('accent'),
            fontFamily: 'Fira Code, monospace, sans-serif',
          }}
        />
      </div>
    </StyledMarkdownInput>
  )
}

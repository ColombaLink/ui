import { useEffect } from 'react'
import { color, Text, usePropState } from '~'
import Editor from '../Code/ReactSImpleEditor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-javascript'
import { styled } from 'inlines'

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
  const [code, setCode] = usePropState(value)
  useEffect(() => {
    event.stopPropagation()
    event.preventDefault()
  })

  return (
    <StyledMarkdownInput>
      <styled.div
        className="markdown"
        style={{
          backgroundColor: color('background2'),
          borderRadius: 4,
          padding: 12,
        }}
      >
        <Text color="text2">Markdown Editor</Text>
      </styled.div>

      <styled.div
        style={{ padding: 12, pointerEvents: disabled ? 'none' : null }}
      >
        <Editor
          value={code}
          onValueChange={(code) => {
            setCode(code)
            // onChange(code)
            onChange({ target: { value: code } })
          }}
          highlight={(tempCode) => {
            try {
              const h = highlight(tempCode, languages.markdown)
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
    </StyledMarkdownInput>
  )
}

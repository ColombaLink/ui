import { useState, useEffect, useCallback } from 'react'

export const useCopyToClipboard = (text) => {
  function copyIt(text) {
    const input = document.createElement('input')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    const result = document.execCommand('copy')
    document.body.removeChild(input)
    return result
  }

  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    if (!copied) setCopied(copyIt(text))
  }, [text])
  useEffect(() => () => setCopied(false), [text])

  return [copied, copy]
}

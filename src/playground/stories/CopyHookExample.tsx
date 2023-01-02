import React from 'react'

import { useCopyToClipboard } from '~/hooks'

import { Code, Container, Button } from '~'

export const CopyHookExample = () => {
  const [copied, copy] = useCopyToClipboard('Copy this text!!!')

  const codeExample = `
    import { useCopyToClipboard } from '~/hooks'

                                 // copies this value to clipboard 
    const [copied, copy] = useCopyToClipboard('Copy this text!!!')

    <Button onClick={copy}>Copy to Clipboard</Button>

    // copied is a boolean with a timeout of 2.5 seconds
    {copied && <div>Copied!!</div>}
    `

  return (
    <>
      <Code value={codeExample} space />
      <Container space>
        <Button onClick={copy} space="8px">
          Copy to Clipboard
        </Button>
        {copied && <div>Copied!!</div>}
      </Container>
    </>
  )
}

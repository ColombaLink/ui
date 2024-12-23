
import ComponentViewer from '../ComponentViewer'

export const useCopyToClipboard = () => {
  const codeExample = `import { useCopyToClipboard, Button, CheckIcon, ClipboardIcon } from '@based/ui'

const [copied, copy] = useCopyToClipboard('Copy this text!!!');

<Button icon={
  copied ? <CheckIcon /> : <ClipboardIcon />
} large clickAnimation onClick={() => copy()}>Copy to Clipboard</Button>
    `

  return (
    <ComponentViewer
      title="useCopyToClipboard"
      examples={[
        {
          code: codeExample,
        },
      ]}
    />
  )
}

import React from 'react'
import ComponentViewer from '../ComponentViewer'

export const Dialog = () => {
  return (
    <div>
      <ComponentViewer
        title="Dialog"
        examples={[
          {
            code: `import { Dialog, Text } from '@based/ui'

<Dialog label="Label">
  <Text space>
    Do something!
  </Text>
  <Dialog.Buttons border>
    <Dialog.Cancel />
    <Dialog.Confirm />
  </Dialog.Buttons>
</Dialog>`,
          },
          {
            code: `import { Dialog, Text, Button, useDialog } from '@based/ui'

const dialog = useDialog();

<Button onClick={() => {
  dialog.open(<Dialog label="Label">
  <Text space>
    Do something!
  </Text>
  <Dialog.Buttons border>
    <Dialog.Cancel />
    <Dialog.Confirm />
  </Dialog.Buttons>
</Dialog>)
}}>Open</Button>
`,
          },
        ]}
      />
    </div>
  )
}

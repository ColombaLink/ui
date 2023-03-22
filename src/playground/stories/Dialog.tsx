import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { useRoute, Text, Button, AddIcon, MinusIcon, Dialog as Dc } from '~'

const SomeComponent = () => {
  const route = useRoute('[x]')
  return (
    <Dc label="Label">
      <Text>This is a path: {route.path.x}</Text>
      <Dc.Buttons>
        <Button
          ghost
          icon={<MinusIcon />}
          onClick={() => {
            route.setPath({ x: Number(route.path.x || 0) - 1 })
          }}
        />
        <Button
          ghost
          icon={<AddIcon />}
          onClick={() => {
            route.setPath({ x: Number(route.path.x || 0) + 1 })
          }}
        />
      </Dc.Buttons>
    </Dc>
  )
}

global.SomeComponent = SomeComponent

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
            code: `import { Dialog, Text, Button, useDialog, useRoute } from '@based/ui'

const dialog = useDialog();
const route = useRoute('[x]', { x: 1 });

<Button large onClick={() => dialog.open(<SomeComponent />)}>
  Open {route.path.x}
</Button>
`,
          },
        ]}
      />
    </div>
  )
}

import React from 'react'
import ComponentViewer from '../ComponentViewer'
import {
  useRoute,
  Text,
  Button,
  AddIcon,
  MinusIcon,
  Dialog as Dc,
  Input,
} from '~'

const SomeComponent = () => {
  const route = useRoute('[x]', { x: 1 })
  return (
    <Dc label="Label">
      <Text>This is a path: {route.path.x}</Text>
      <Dc.Buttons>
        <Button
          ghost
          clickAnimation
          icon={<MinusIcon />}
          onClick={() => {
            route.setPath({ x: Number(route.path.x || 0) - 1 })
          }}
        />
        <Button
          ghost
          clickAnimation
          icon={<AddIcon />}
          onClick={() => {
            route.setPath({ x: Number(route.path.x || 0) + 1 })
          }}
        />
        <Input type="text" />
      </Dc.Buttons>
    </Dc>
  )
}

global.SomeComponent = SomeComponent

export const useDialog = () => {
  return (
    <div>
      <ComponentViewer
        title="useDialog"
        examples={[
          {
            code: `import { Dialog, Text  } from '@based/ui'

<Dialog label="Label">
  <Text style={{marginBottom:24}}>
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

          {
            code: `import { Dialog, Text, Button, useDialog, useRoute, Input } from '@based/ui'

const dialog = useDialog();
const route = useRoute('[x]', { x: 1 });

<Button large onClick={() => dialog.open(

  <Dialog label="Label">
  <Text style={{marginBottom:24}}>
    Do something!
  </Text>
  <Input type="json" />
  <Dialog.Buttons border>
    <Dialog.Cancel />
    <Dialog.Confirm keyboardShortcut="Cmd+S"/>
  </Dialog.Buttons>
</Dialog>

)}>
  Open {route.path.x}
</Button>
`,
          },
        ]}
      />
    </div>
  )
}

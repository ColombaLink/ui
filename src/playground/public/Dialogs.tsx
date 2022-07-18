import React from 'react'
import { Dialog, DialogProvider, useDialog } from '~/components/Dialog'
import { Text, Button } from '~'
import ComponentViewer from '../ComponentViewer'

const codeExample = `<Dialog>
    <Text weight={600} space>
      Create a new organisation
    </Text>
    <Text weight={400} wrap space>
      This is your organization’s name within Based. For example, you can
      use the name of your company or department.
    </Text>
  </Dialog>`

export const Dialogs = () => {
  const { confirm, alert, prompt, open } = useDialog()

  return (
    <div>
      <ComponentViewer
        component={Dialog}
        propsName="DialogProps"
        examples={[
          {
            code: codeExample,
          },
        ]}
      />

      <Dialog space label="Create a new organisation">
        <Text weight={400} wrap space>
          This is your organization’s name within Based. For example, you can
          use the name of your company or department.
        </Text>
      </Dialog>
      <br />
      <Dialog space label="Testing this here" border>
        <Text weight={400} wrap space>
          This is your organization’s name within Based. For example, you can
          use the name of your company or department.
        </Text>

        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm />
        </Dialog.Buttons>
      </Dialog>

      <br />
      <Button
        space
        onClick={async () => {
          const ok = await confirm('Confirm please')
        }}
      >
        Confirm #1
      </Button>
      <Button
        space
        onClick={async () => {
          const ok = await prompt('Confirm please')
        }}
      >
        Prompt
      </Button>
      <Button
        space
        onClick={async () => {
          const ok = await alert('Red Alert')
        }}
      >
        Alert
      </Button>
      <Button
        space
        onClick={async () => {
          const ok = await open(<Dialog label="Bonjour monsieur">Hello</Dialog>)
        }}
      >
        Open
      </Button>
    </div>
  )
}

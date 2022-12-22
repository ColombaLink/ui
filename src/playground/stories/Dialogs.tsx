import React from 'react'
import { Dialog, useDialog } from '~/components/Dialog'
import { Text, Button, WarningIcon, Callout, Code } from '~'

const codeExample = `import { Dialog } from '~/components/Dialog'

<Dialog label="label">
    <Text color="text2" space>
      Create a new organisation
    </Text>
    <Text color="text2" wrap space>
      This is your organization’s name within Based. For example, you can
      use the name of your company or department.
    </Text>
    <Dialog.Buttons border>
       <Dialog.Cancel />
       <Dialog.Confirm />
    </Dialog.Buttons>
  </Dialog>
  `

export const Dialogs = () => {
  const { confirm, alert, prompt, open } = useDialog()

  return (
    <div>
      {/* <ComponentViewer
        component={Dialog}
        propsName="DialogProps"
        examples={[
          {
            code: codeExample,
          },
        ]}
      /> */}

      <Code value={codeExample} space />

      <Dialog
        space
        label="Create a new organisation"
        bottomLeft="b"
        bottomRight="c"
      >
        <Text color="text2" wrap space>
          This is your organization’s name within Based. For example, you can
          use the name of your company or department.
        </Text>
      </Dialog>
      <br />

      <Dialog space label="Testing this here" border>
        <Text color="text2" wrap space>
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
          const ok = await open(
            <Dialog label="Bonjour monsieur">
              {Array.from(Array(1000)).map((_, index) => {
                return <div key={index}>Hello {index}</div>
              })}
              <Dialog.Buttons border>
                <Dialog.Cancel />
                <Dialog.Confirm />
              </Dialog.Buttons>
            </Dialog>
          )
        }}
      >
        Open custom dialog
      </Button>
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
          const ok = await alert(
            'Red Alert',
            <Callout
              label="Command and conquer"
              icon={<WarningIcon />}
              color="red"
            />
          )
        }}
      >
        Alert
      </Button>
    </div>
  )
}

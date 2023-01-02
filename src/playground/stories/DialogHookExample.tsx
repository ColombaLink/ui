import React from 'react'
import { Button, Text, Container, Callout, Code, useDialog, Dialog } from '~'

export const DialogHookExample = () => {
  const codeExample = `
      import { useDialog } from '@based/ui'
                                     
      const { prompt, confirm, alert } = useDialog()

      <Button onClick={() => alert('Alerting you')} space>Alert</Button>
      
      // async await
      <Button space onClick={async () => {
        const ok = await confirm('Confirming title label')
        if (ok) {
            console.log("It's " + ok + ", you have confirmed")
        }
      }} >Confirm</Button>

      // prompt input
      <Button space onClick={async () => {
        const ok = await prompt('Waiting for your input')
        if (ok) {
            console.log('Your input: ' + ok)
        }
      }}

      // As a second argument you can add any React/UI child element you want.
      <Button space 
        onClick={() => {
                   // label title , child component
            alert('Alerting you', <Callout color="red" label="Calloutje" />)
        }}>
        Alert + Child comp
      </Button>
  `

  const customExample = `
        import { useDialog, Dialog } from '@based/ui'

        const { open } = useDialog()

        <Button
          onClick={async () => {
            const ok = await open(
              <Dialog label="Bonjour monsieur">
                <Text>Some text</Text>
                <Dialog.Buttons border>
                  <Dialog.Cancel />
                  <Dialog.Confirm />
                </Dialog.Buttons>
              </Dialog>
            )
          }}
        >
        Open custom Dialog
        </Button>


  `

  const { prompt, confirm, alert, open } = useDialog()

  return (
    <>
      <Text space>Alert, confirm & prompt</Text>
      <Code value={codeExample} space />
      <Container space>
        <Button
          space
          onClick={() => {
            alert('Alerting you')
          }}
        >
          Alert
        </Button>
        <Button
          space
          onClick={async () => {
            const ok = await confirm('Confirming title label')
            if (ok) {
              console.log("It's " + ok + ', you have confirmed')
            }
          }}
        >
          Confirm
        </Button>
        <Button
          space
          onClick={async () => {
            const ok = await prompt('Waiting for your input')
            if (ok) {
              console.log('Your input: ' + ok)
            }
          }}
        >
          Prompt
        </Button>
        <Button
          space
          onClick={() =>
            alert('Alerting you', <Callout color="red" label="Calloutje" />)
          }
        >
          Alert + Child Comp
        </Button>
      </Container>
      <Text space>Custom Dialog</Text>
      <Code value={customExample} space />
      <Container space>
        <Button
          onClick={async () => {
            await open(
              <Dialog label="Bonjour monsieur">
                <Text>Some text</Text>
                <Dialog.Buttons border>
                  <Dialog.Cancel />
                  <Dialog.Confirm onConfirm={() => console.log('good!')} />
                </Dialog.Buttons>
              </Dialog>
            )
          }}
        >
          Open custom Dialog
        </Button>
      </Container>
    </>
  )
}

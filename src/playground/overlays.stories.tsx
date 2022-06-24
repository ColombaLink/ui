import React, { useEffect, useRef } from 'react'
import {
  Button,
  color,
  ContextDivider,
  ContextItem,
  Dialog,
  MoreIcon,
  Provider,
  ScheduleIcon,
  useContextMenu,
  useDialog,
  Text,
  Input,
} from '~'

const DialogWithMenu = () => {
  return (
    <Dialog>
      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: center)
      </Button>
    </Dialog>
  )
}

const SimpleMenu = () => {
  const dialog = useDialog()
  return (
    <>
      <ContextItem
        onClick={() => {
          dialog.open(<DialogWithMenu />)
          // dialog.prompt('hello')
        }}
      >
        Open dialog
      </ContextItem>
      <ContextItem inset>Do something else</ContextItem>
      <ContextItem
        onClick={() => {
          alert('close it')
        }}
        leftIcon={ScheduleIcon}
        // right icon only show on hover
        // rightOnHover
        rightIcon={() => {
          return (
            <MoreIcon
              onClick={() => {
                alert('snapje')
              }}
            />
          )
        }}
      >
        Flap
      </ContextItem>
    </>
  )
}

const LargeMenu = () => {
  const a = []
  for (let i = 0; i < 100; i++) {
    a.push(i)
  }
  return (
    <>
      {a.map((v, i) => {
        return (
          <ContextItem inset key={i}>
            {i} Do something
          </ContextItem>
        )
      })}
    </>
  )
}

const DoubleOverlayMenu = () => {
  return (
    <>
      <ContextItem onClick={() => {}}>Keep it 💯!!</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem onClick={() => {}}>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'right', offset: { x: -20, y: 10 } }
        )}
      >
        Keep it 💯
      </ContextItem>
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'left', offset: { x: 20, y: 10 } }
        )}
      >
        yes + offset
      </ContextItem>
      <ContextItem
        rightIcon={ScheduleIcon}
        onClick={useContextMenu(LargeMenu, {}, { position: 'left' })}
      >
        Click me!
      </ContextItem>
    </>
  )
}

export const ContextMenus = () => {
  return (
    <Provider>
      <Button
        style={{ marginBottom: 24 }}
        onClick={useContextMenu(DoubleOverlayMenu, { flap: 1 })}
      >
        Menu (double overlays)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: center)
      </Button>

      {/* make nice with it */}
      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'left' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: left)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'right' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: right)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'top' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: top)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'left' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: left)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'right' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: right)
      </Button>

      <Button
        onClick={useContextMenu(
          SimpleMenu,
          {},
          {
            position: 'left',
            variant: 'over',
            style: {
              border: `3px solid ${color('PrimaryMain')}`,
              borderRadius: 0,
            },
          }
        )}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (variant: over / position: left) css override
      </Button>

      <Button
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { variant: 'over', placement: 'left' }
        )}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (variant: over / placement: left)
      </Button>

      <Button
        style={{
          marginBottom: 24,
        }}
        onClick={useContextMenu(LargeMenu)}
      >
        Menu (large menu)
      </Button>
      <Button
        onClick={useContextMenu(DoubleOverlayMenu, { props: { flap: 1 } })}
      >
        Menu (double overlays)
      </Button>
    </Provider>
  )
}

const DialogLarge = () => {
  const myLongList = []

  for (let i = 0; i < 1000; i++) {
    myLongList.push(<div key={i}>{i} 🤥</div>)
  }

  return (
    <Dialog>
      <Text color="TextSecondary">
        This action cannot be undone. This will permanently delete the project{' '}
        <b>Demo</b>, environment <b>Production</b>
      </Text>
      {myLongList}
    </Dialog>
  )
}

const DialogButton = ({ level = 1 }) => {
  const { confirm, alert, prompt, open } = useDialog()

  return (
    <>
      <Button
        iconLeft="🤡"
        onClick={() => {
          open(<DialogLarge />)
        }}
      >
        HUGE DIALOG
      </Button>

      <Button
        onClick={async () => {
          const ok = await confirm('Confirm please')
          // log.global.debug('confirm', { ok })
        }}
      >
        Confirm #{level}
      </Button>

      <br />

      <Button
        onClick={async () => {
          await alert('Alert please')
        }}
      >
        Alert #{level}
      </Button>

      <br />

      <Button
        onClick={async () => {
          const name = await prompt('What is your name?')
          // log.global.debug('name: ', { name })
        }}
      >
        Prompt #{level}
      </Button>
    </>
  )
}

const DialogButtonAndClose = () => {
  const dialog = useDialog()
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  return (
    <Button
      onClick={() => {
        const id = dialog.open(
          <Dialog title="I will dissappear!">Oh noooo!</Dialog>
        )

        timer.current = setTimeout(() => {
          dialog.close(id)
        }, 3000)
      }}
    >
      Open Dialog and close after 3 seconds
    </Button>
  )
}

export const Dialogs = () => {
  return (
    <Provider>
      <div style={{ maxWidth: '100%' }}>
        <Dialog>Only title</Dialog>
        <br />
        <Dialog>
          <Text color="TextPrimary">Primary Text</Text>
          <Text color="TextSecondary" wrap>
            This action cannot be undone. This will permanently delete the
            project <b>Demo</b>, environment <b>Production</b>
          </Text>
        </Dialog>
        <br />
        <Dialog title="Title">And description</Dialog>
        <br />
        <Dialog title="Title and buttons" padding={0}>
          <Dialog.Buttons border>
            <Dialog.Cancel />
            <Dialog.Confirm />
          </Dialog.Buttons>
        </Dialog>
        <br />
        <Dialog title="Are you sure you want to permanently delete this content model?">
          <Dialog.Body>This action cannot be undone.</Dialog.Body>
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm />
          </Dialog.Buttons>
        </Dialog>
        <br />
        <Dialog title="Subscribe">
          <Dialog.Body>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
            <Input />
          </Dialog.Body>
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm />
          </Dialog.Buttons>
        </Dialog>
        <br />
        <Dialog title="Only input">
          <Dialog.Body>
            <Input />
          </Dialog.Body>
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm />
          </Dialog.Buttons>
        </Dialog>
      </div>
      <div>
        <DialogButton />
        <br />
        <DialogButtonAndClose />
        <br />
      </div>
    </Provider>
  )
}

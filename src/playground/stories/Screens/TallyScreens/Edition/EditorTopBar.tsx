import React from 'react'
import { Text, Topbar, Button, color, Dialog, useDialog, AddIcon } from '~'

export const EditorTopBar = () => {
  const dialog = useDialog()

  const addContentHandler = () => {
    dialog.open(<AddShowDialog />)
  }

  return (
    <Topbar
      style={{ justifyContent: 'space-between' }}
      data={{
        Content: '/content',
        Design: '/design',
        Settings: '/show-settings',
        Layer: '/lay',
      }}
      logo={<Text style={{ paddingLeft: 24 }}>Show name</Text>}
    >
      <div style={{ display: 'flex', gap: 8, position: 'absolute', right: 0 }}>
        <Button
          color="border"
          style={{ color: color('text') }}
          onClick={addContentHandler}
        >
          Clear Live
        </Button>
        <Button
          outline
          color="border"
          style={{ color: color('text') }}
          onClick={addContentHandler}
        >
          Translate
        </Button>
        <Button
          outline
          color="border"
          style={{ color: color('text') }}
          onClick={addContentHandler}
        >
          Preview
        </Button>
        <Button
          color="accent"
          onClick={addContentHandler}
          style={{ marginLeft: 12 }}
        >
          Publish
        </Button>
      </div>
    </Topbar>
  )
}

const AddShowDialog = () => {
  return (
    <Dialog label="Create a new edition">
      opties
      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add Edition</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

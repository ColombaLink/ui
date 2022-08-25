import React from 'react'
import { SideBar } from '../TallyComponents/SideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Page,
  useDialog,
  Dialog,
  BasedIcon,
  Table,
  Text,
} from '~'
import { color } from '~'

export const Content = () => {
  const dialog = useDialog()

  const addContentHandler = () => {
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', paddingLeft: 48 }}>
      <SideBar />

      <Topbar
        style={{ justifyContent: 'space-between' }}
        data={{ Content: '/', Design: '/des', Settings: '/set', Layer: '/lay' }}
        logo={<Text style={{ paddingLeft: 24 }}>Show name</Text>}
      >
        <div style={{ display: 'flex', gap: 8 }}>
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

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>test</Page>
      </div>
    </div>
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

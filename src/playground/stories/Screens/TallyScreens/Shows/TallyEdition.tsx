import React from 'react'
import { TallySideBar } from '../../TallyComponents/TallySideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Page,
  useDialog,
  Dialog,
  Input,
  UploadIcon,
  BasedIcon,
  Table,
} from '~'

export const TallyEdition = () => {
  const dialog = useDialog()

  const addEditionHandler = () => {
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ 'Show Name': '/' }} noLogo onFilter={() => {}}>
        <Button icon={AddIcon} ghost color="accent" onClick={addEditionHandler}>
          Add Edition
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>
          <Table
            data={[
              {
                '': <Avatar label="Tally" icon={BasedIcon} color="green" />,
                Name: "Tally's show",
                Sequences: '11',
                'Last Modified': '4 hours ago',
              },
            ]}
          />
        </Page>
      </div>
    </div>
  )
}

const AddShowDialog = () => {
  return (
    <Dialog label="Create a new edition">
      <Input space label="Name of edition" placeholder="Edition name" />
      <Input
        space
        label="Add edition image"
        icon={UploadIcon}
        placeholder="Upload file"
      />

      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add Edition</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

import React from 'react'
import { SideBar } from '../../TallyComponents/SideBar'
import {
  Topbar,
  Button,
  AddIcon,
  Page,
  useDialog,
  Dialog,
  Input,
  MoreIcon,
  Table,
  Menu,
} from '~'
import { WorkspaceMenu } from '../../TallyComponents/WorkspaceMenu'

export const Organisations = () => {
  const dialog = useDialog()

  const addOrganisationHandler = () => {
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <SideBar />

      <Topbar data={{ Organisations: '/' }} noLogo>
        <Button
          icon={AddIcon}
          ghost
          color="accent"
          onClick={addOrganisationHandler}
        >
          Add Organisation
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <WorkspaceMenu />
        <Page>
          <Table
            data={[
              {
                Name: 'Saulx',
              },
              {
                Name: 'Tally',
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
    <Dialog label="Create a new organisation">
      <Input
        space
        label="Name of the organisation"
        placeholder="Organisation name..."
      />
      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add Organisation</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

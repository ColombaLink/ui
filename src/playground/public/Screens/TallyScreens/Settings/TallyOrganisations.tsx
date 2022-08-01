import React from 'react'
import { TallySideBar } from '../../TallyComponents/TallySideBar'
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

export const TallyOrganisations = () => {
  const dialog = useDialog()

  const addOrganisationHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

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
        <Menu
          prefix="/"
          data={{
            'Workspace Settings': {
              Users: '?story=TallyUsers',
              Organisations: '?story=TallyOrganisations',
              'User Roles': '?story=TallyUserRoles',
            },
          }}
        />
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

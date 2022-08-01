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

export const TallyUserRoles = () => {
  const dialog = useDialog()

  const userRoleHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ 'User Roles': '/' }} noLogo>
        <Button icon={AddIcon} ghost color="accent" onClick={userRoleHandler}>
          Add user role
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
                Name: 'Admins',
                Options: (
                  <MoreIcon
                    onClick={() => {
                      console.log('click')
                    }}
                  />
                ),
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
    <Dialog label="Create a new user role group">
      <Input
        space
        label="Name of the user role group"
        placeholder="User role name..."
      />
      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add user role</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

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

export const UserRoles = () => {
  const dialog = useDialog()

  const userRoleHandler = () => {
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <SideBar />

      <Topbar data={{ 'User Roles': '/' }} noLogo>
        <Button icon={AddIcon} ghost color="accent" onClick={userRoleHandler}>
          Add user role
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <WorkspaceMenu />
        <Page>
          <Table
            data={[
              {
                Name: 'Admins',
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

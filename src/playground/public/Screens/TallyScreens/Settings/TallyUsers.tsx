import React from 'react'
import { TallySideBar } from '../../TallyComponents/TallySideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Checkbox,
  Page,
  Text,
  useDialog,
  Dialog,
  Input,
  EmailIcon,
  RadioButton,
  MoreIcon,
  Table,
  Grid,
  Menu,
  MultiSelect,
} from '~'

export const TallyUsers = () => {
  const dialog = useDialog()

  const inviteUserHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ Users: '/' }} noLogo>
        <Button icon={AddIcon} ghost color="accent" onClick={inviteUserHandler}>
          Invite User
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
                Name: 'Saulx Admin',
                '': <Avatar label="SA" />,
                Email: 'admin@saulx.com',
                'User Role': 'admin',
                'Admin Organizations': 'Saulx',
                'Show Access': '',
                Options: (
                  <MoreIcon
                    onClick={() => {
                      console.log('click')
                    }}
                  />
                ),
              },
              {
                Name: 'Mr Tally',
                '': <Avatar label="SA" color="babyblue" />,
                Email: 'info@tally.tv',
                'User Role': 'admin',
                'Admin Organizations': 'Radio Bremen, KiKA, digame',
                'Show Access': 'Eurovision Song Contest',
                Options: <MoreIcon />,
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
    <Dialog label="Invite a new User">
      <Input
        space
        label="Email"
        icon={EmailIcon}
        placeholder="Email adress..."
      />
      <Text space="12px">User Roles</Text>
      <Checkbox description="Admin" space />

      <Text space="12px">Administer Organisations</Text>
      <Grid gap={12} itemWidth={150} space>
        <Checkbox description="Stadt Krefeld" />
        <Checkbox description="Saulx" />
        <Checkbox description="SRF" />
        <Checkbox description="Sport 1" />
        <Checkbox description="ARD" />
        <Checkbox description="Digame" />
        <Checkbox description="Twister Interactive" />
        <Checkbox description="RTL Germany" />
        <Checkbox description="Yle" />
      </Grid>

      <MultiSelect
        onChange={() => console.log('Snurp')}
        placeholder="select something..."
        label="Show Access"
        filterable="create"
        options={['yes', 'no', 'for sure']}
      />

      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add User</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

import React from 'react'
import { TallySideBar } from '../../TallyComponents/TallySideBar'
import {
  Avatar,
  Topbar,
  Button,
  AddIcon,
  Page,
  Text,
  useDialog,
  Dialog,
  Input,
  UploadIcon,
  RadioButton,
  MoreIcon,
  Table,
  Menu,
} from '~'

export const TallyUsers = () => {
  const dialog = useDialog()

  const addShowHandler = () => {
    console.log('click')
    dialog.open(<AddShowDialog />)
  }

  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ Shows: '/' }} logo={<></>} onFilter={() => {}}>
        <Button icon={AddIcon} ghost color="accent" onClick={addShowHandler}>
          Invite User
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Menu
          prefix="/"
          data={{
            'Workspace Settings': {
              Users: '?story=TallyUsers',
              Organizations: '/general',
              'User groups': '/user-groups',
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
    <Dialog label="Create a new show">
      <Input space label="Name of show" placeholder="Show name" />
      <Input space label="Add show image" icon={UploadIcon} />
      <RadioButton
        label="Organisations"
        data={[
          'Saulx',
          'Twister Interactive',
          'Digame',
          'Sport1',
          'ARD',
          'SRF',
        ]}
      />
      <Dialog.Buttons border>
        <Button icon={AddIcon}>Add Show</Button>
      </Dialog.Buttons>
    </Dialog>
  )
}

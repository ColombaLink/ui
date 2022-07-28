import React from 'react'
import { Topbar } from '~/components/Topbar'
import {
  Menu,
  Page,
  Container,
  Button,
  Text,
  Input,
  Avatar,
  MenuSmall,
} from '~'
import { ScreenIcon, GearsIcon, AddIcon } from '~'

export const TallyScreens = () => {
  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <MenuSmall
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 48,
        }}
        data={[
          { icon: <ScreenIcon />, label: 'Shows', href: '/shows' },
          { icon: <GearsIcon />, label: 'Settings', href: '/settings' },
        ]}
      />

      <Topbar data={{ Users: '/' }} logo={<></>}>
        <Button icon={AddIcon} ghost color="accent">
          Invite User
        </Button>
      </Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Menu
          prefix="/"
          data={{
            'Workspace Settings': {
              Users: '/project settings',
              Organizations: '/general',
              'User groups': '/user-groups',
            },
          }}
        />
        <Page>
          <Text>Tally ho</Text>
        </Page>
      </div>
    </div>
  )
}

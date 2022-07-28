import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Button, Text } from '~'
import { AddIcon } from '~'
import { TallySideBar } from './TallyComponents/TallySideBar'

export const TallyScreens = () => {
  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

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
          <Text>Tally Screens</Text>
        </Page>
      </div>
    </div>
  )
}

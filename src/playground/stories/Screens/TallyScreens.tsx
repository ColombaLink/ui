import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Button, Text } from '~'
import { AddIcon } from '~'
import { TallySideBar } from './TallyComponents/TallySideBar'

export const TallyScreens = () => {
  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <TallySideBar />

      <Topbar data={{ Tally: '/' }} noLogo></Topbar>

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
          <Text>Tally Screens</Text>
        </Page>
      </div>
    </div>
  )
}

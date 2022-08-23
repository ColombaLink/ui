import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Button, Text } from '~'
import { AddIcon } from '~'
import { SideBar } from '../TallyComponents/SideBar'
import { WorkspaceMenu } from '../TallyComponents/WorkspaceMenu'

export const TallyScreens = () => {
  return (
    <div style={{ position: 'relative', display: 'block', paddingLeft: 48 }}>
      <SideBar />

      <Topbar data={{ Tally: '/' }} noLogo></Topbar>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <WorkspaceMenu />
        <Page>
          <Text>Tally Screens</Text>
        </Page>
      </div>
    </div>
  )
}

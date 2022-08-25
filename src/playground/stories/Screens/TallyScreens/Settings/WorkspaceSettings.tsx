import React from 'react'
import { Topbar } from '~/components/Topbar'
import { SideBar } from '../TallyComponents/SideBar'
import { WorkspaceMenu } from './WorkspaceMenu'
import { Page, Text } from '~'

export const WorkspaceSettings = () => {
  return (
    <div style={{ position: 'relative', paddingLeft: 48 }}>
      <SideBar />
      <Topbar data={{ Tally: '/' }} icons={['GearsIcon']} noLogo></Topbar>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <WorkspaceMenu />
        <Page>
          <Text>Settings Screen</Text>
        </Page>
      </div>
    </div>
  )
}

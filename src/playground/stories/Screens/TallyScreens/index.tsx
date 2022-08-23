import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Button, Text, useLocation } from '~'
import { AddIcon } from '~'
import { SideBar } from '../TallyComponents/SideBar'
import { WorkspaceMenu } from '../TallyComponents/WorkspaceMenu'
import { Shows } from './Shows/Shows'

export const TallyScreens = () => {
  const [location] = useLocation()

  if (location === '/shows') {
    return (
      <Shows />
      // <div style={{ position: 'relative', paddingLeft: 48 }}>
      //   <SideBar />
      //   <Topbar data={{ Tally: '/' }} noLogo></Topbar>
      //   <div style={{ display: 'flex', flexGrow: 1 }}>
      //     <WorkspaceMenu />
      //     <Page>
      //       <Text>{location}</Text>
      //     </Page>
      //   </div>
      // </div>
    )
  }

  if (location === '/settings') {
    return (
      <div style={{ position: 'relative', paddingLeft: 48 }}>
        <SideBar />
        <Topbar data={{ Tally: '/' }} noLogo></Topbar>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <WorkspaceMenu />
          <Page>
            <Text>{location}</Text>
          </Page>
        </div>
      </div>
    )
  }
}

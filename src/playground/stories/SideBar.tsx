import React from 'react'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~/icons'
import { Sidebar } from '~/components/Sidebar'
import { Avatar } from '~/components/Avatar'
import ComponentViewer from '../ComponentViewer'
import { Code } from '~/components/Code'

export const SideBar = () => {
  const codeExample = `
  import { Sidebar } from '~/components/Sidebar'
  import { Avatar } from '~'
  import { ScreenIcon, GearsIcon } from '~/icons'
  
  // logo is an optional prop
  <Sidebar
        avatar={<Avatar size={24} color="accent" label="T" />}
        data={[
          {
            icon: <ScreenIcon />,
            label: 'Shows',
            href: '?story=tally-screens',
            isActive: true,
          },
          {
            icon: <GearsIcon />,
            label: 'Settings',
            href: '?story=tally-screens',
          },
        ]}
  />
  `

  return (
    <>
      <Code value={codeExample} space />

      <Sidebar
        avatar={<Avatar size={24} color="accent" label="T" />}
        data={[
          {
            icon: <ScreenIcon />,
            label: 'Shows',
            href: '?story=tally-screens',
            isActive: true,
          },
          {
            icon: <GearsIcon />,
            label: 'Settings',
            href: '?story=tally-screens',
          },
        ]}
      />
    </>
  )
}

import React from 'react'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~/icons'
import { Sidebar } from '~/components/Sidebar'

export const SideBar = () => {
  return (
    <>
      <Sidebar
        data={[
          {
            icon: ScreenIcon,
            label: 'Shows',
            href: '?story=tally-screens',
            isActive: true,
          },
          {
            icon: GearsIcon,
            label: 'More',
            href: '?story=tally-screens',
            isActive: true,
          },
        ]}
      />
    </>
  )
}

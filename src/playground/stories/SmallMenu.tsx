import React from 'react'
import { Avatar } from '~/components/Avatar'
import { MenuSmall } from '~/components/MenuSmall'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~/icons'
import { Sidebar } from '~/components//Sidebar'

export const SmallMenu = () => {
  return (
    <div>
      <MenuSmall
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
    </div>
  )
}

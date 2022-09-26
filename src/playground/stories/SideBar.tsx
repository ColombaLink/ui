import React from 'react'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~/icons'
import { Sidebar } from '~/components/Sidebar'
import ComponentViewer from '../ComponentViewer'
import { Code } from '~/components/Code'

export const SideBar = () => {
  const codeExample = `
  import { Sidebar } from '~/components/Sidebar'
  import { Avatar } from '~'
  import { ScreenIcon, GearsIcon } from '~/icons'

  <Sidebar
        avatar={<Avatar size={24} color="accent" label="T" />}
        data={[
          {
            icon: ScreenIcon,
            label: 'Schema',
            href: '/schema',
          },
          {
            icon: GearsIcon,
            label: 'Content',
            href: '/content',
          },
          {
            icon: SettingsIcon,
            label: 'Files',
            href: '/files',
          },
        ]}
  />
  `

  const exampleSidebarData = [
    {
      icon: ScreenIcon,
      label: 'Schema',
      href: '/schema',
    },
    {
      icon: GearsIcon,
      label: 'Content',
      href: '/content',
    },
    {
      icon: SettingsIcon,
      label: 'Files',
      href: '/files',
    },
  ]

  return (
    <>
      {/* <ComponentViewer
        component={Sidebar}
        propsName="SidebarProps"
        examples={[
          {
            props: {
              data: exampleSidebarData,
            },
          },
        ]}
      /> */}

      <Code value={codeExample} space />

      <Sidebar
        data={[
          {
            icon: ScreenIcon,
            label: 'Schema',
            href: '/schema',
          },
          {
            icon: GearsIcon,
            label: 'Content',
            href: '/content',
          },
          {
            icon: SettingsIcon,
            label: 'Files',
            href: '/files',
          },
        ]}
      />
    </>
  )
}

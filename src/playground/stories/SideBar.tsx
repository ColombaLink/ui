import React from 'react'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~'
import { Sidebar } from '~/components/Sidebar'
import ComponentViewer from '../ComponentViewer'
import { Code } from '~/components/Code'

export const SideBar = () => {
  const codeExample = `
  import { Sidebar } from '~/components/Sidebar'
  import { Avatar } from '~'
  import { ScreenIcon, GearsIcon } from '~/icons'

  <Sidebar
        expandable
        data={[
          {
            subTitle: 'Subtitle',
          },
          {
            icon: <ScreenIcon/>,
            label: 'Schema',
            href: '/schema',
          },
          {
            icon: <GearsIcon/>,
            label: 'Content',
            href: '/content',
          },
          {
            icon: <SettingsIcon/>,
            label: 'Files',
            href: '/files',
          },
        ]}
  />
  `

  return (
    <>
      {/* <ComponentViewer
        component={Sidebar}
        propsName="SidebarProps"
        examples={[
          {
            props: {
              expandable: true,
              data: [
                { subTitle: 'Subtitle' },
                {
                  icon: SettingsIcon,
                  label: 'Schema',
                  href: '/schema',
                },
              ],
            },
          },
        ]}
      /> */}

      <Code value={codeExample} space />

      <Sidebar
        expandable
        data={[
          {
            subTitle: 'Subtitle',
          },
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

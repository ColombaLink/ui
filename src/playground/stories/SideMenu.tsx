import React from 'react'
import { Menu } from '~/components/Menu'
import ComponentViewer from '../ComponentViewer'
import { Code } from '~/components/Code'
import { Avatar } from '~/components/Avatar'

export const SideMenu = () => {
  const codeExample = `
  import { Menu } from '~/components/Menu'
  
  
  // logo is an optional prop
  <Menu
        data={{
          'Project settings': '/project settings',
          General: '/general',
          Nested: {
            'Nested item 1': '/nested settings',
            'Nested item 2': '/nested settings',
          },
        }}
  />
  `

  return (
    <div>
      <Code value={codeExample} space="32px" />

      <ComponentViewer
        component={Menu}
        propsName="MenuProps"
        examples={[
          {
            props: {
              data: {
                'Project settings': '/project settings',
                General: '/general',
                Nested: {
                  'Nested item 1': '/nested settings',
                  'Nested item 2': '/nested settings',
                },
              },
            },
          },
        ]}
      />
      <Menu
        data={{
          'Project settings': '/project settings',
          General: '/general',
          Nested: {
            'Nested item 1': '/nested settings',
            'Nested item 2': '/nested settings',
          },
        }}
      />
    </div>
  )
}

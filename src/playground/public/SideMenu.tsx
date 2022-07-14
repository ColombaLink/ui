import React from 'react'
import { Menu } from '~/components/Menu'
import ComponentViewer from '../ComponentViewer'

export const SideMenu = () => {
  return (
    <div>
      <ComponentViewer
        component={Menu}
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

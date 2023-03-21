import React from 'react'
import { Sidebar as MC } from '~/components/Sidebar'
import ComponentViewer from '../../ComponentViewer'

export const Schema = () => {
  return (
    <div>
      <ComponentViewer
        component={MC}
        propsName="SidebarProps"
        examples={[
          {
            code: `import { Schema, useRoute, BasedIcon } from '@based/ui'

const route = useRoute('[type]/[field]', { type: 'file', field: 'src' });

<Schema 
  style={{ height: 1000 }}
  values={route.path}
  onChange={(key, v) => {
    route.setPath({ [key]: v })
  }}
/>`,
          },
        ]}
      />
    </div>
  )
}

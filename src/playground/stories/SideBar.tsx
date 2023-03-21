import React from 'react'
import { Sidebar as MC } from '~/components/Sidebar'
import ComponentViewer from '../ComponentViewer'

export const Sidebar = () => {
  return (
    <div>
      <ComponentViewer
        component={MC}
        propsName="SidebarProps"
        examples={[
          {
            code: `import { Sidebar, useRoute, BasedIcon } from '@based/ui'

const route = useRoute('[page]', { page: 'based' });

<Sidebar 
  active={route.path.page}        
  onChange={page => route.setPath({ page })}   
  data={{
    based: <BasedIcon />,
    bla: { icon: <BasedIcon />, label: 'snurx' }
  }}
/>`,
          },
          {
            code: `import { Sidebar, useRoute, BasedIcon } from '@based/ui'

const route = useRoute('[page]', { page: 'based' });

<Sidebar 
  active={route.path.page}        
  onChange={page => route.setPath({ page })}   
  data={[{
    icon: <BasedIcon />,
    value: 'based',
    label: 'based'
  },
  {
    icon: <BasedIcon />,
    value: 'bla',
    label: 'hello'
  }
]}
/>`,
          },
        ]}
      />
    </div>
  )
}

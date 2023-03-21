import React from 'react'
import { Menu as MC } from '~/components/Menu'
import ComponentViewer from '../ComponentViewer'

export const Menu = () => {
  return (
    <div>
      <ComponentViewer
        component={MC}
        propsName="MenuProps"
        examples={[
          {
            code: `import { Menu, useRoute } from '@based/ui'

const route = useRoute('[page]', { page: 'project' });

<Menu 
  active={route.path.page}        
  onChange={page => route.setPath({ page })}   
  data={{
    project: 'Project settings',
    general: 'General',
    Nested: {
      nested1: 'Nested item 1',
      nested2: 'Nested item 2'
    }
  }}
/>
            `,
          },
        ]}
      />
    </div>
  )
}

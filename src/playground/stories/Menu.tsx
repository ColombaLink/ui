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
            code: `import { Menu, useRoute, BasedIcon, Text, Spacer } from '@based/ui'

const route = useRoute('[page]', { page: 'project' });

<Menu 
  collapse
  header={
    <Text style={{ marginBottom: 24 }}>
      Menu
    </Text>
  }
  active={route.path.page}        
  onChange={page => route.setPath({ page })}   
  data={{
    project: 'Project settings',
    general: 'General',
    Nested: {
      nested1: 'Nested item 1',
      nested2: 'Nested item 2'
    },
    Blurf: [{
      icon: <BasedIcon />,
      value: 'based',
      label: 'Based',
      onClick: () => console.log('hello')
    }, 'Button']
  }}
/>
            `,
          },
        ]}
      />
    </div>
  )
}

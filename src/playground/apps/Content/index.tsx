import React, { useEffect } from 'react'
import ComponentViewer from '../../ComponentViewer'
import { table, button, contentEditModal } from './views'
import { client } from '../../based'
// vi

export const Content = () => {
  useEffect(() => {
    client.call('db:set', {
      $db: 'config',
      type: 'view',
      $id: 'vitable',
      config: table,
      name: 'ALL DATA',
      category: 'data',
      hidden: false,
    })
    client.call('db:set', {
      $db: 'config',
      type: 'view',
      $id: 'vibutton',
      config: button,
      name: 'BUTTON',
      category: 'dashboard',
      hidden: false,
    })
    client.call('db:set', {
      $db: 'config',
      type: 'view',
      $id: 'vimodal',
      config: contentEditModal,
      name: 'EDIT-MODAL',
      category: 'hidden',
      hidden: true,
    })
  }, [])

  return (
    <div>
      <ComponentViewer
        title="Content"
        examples={[
          {
            code: `import { Content, useRoute, color } from '@based/ui'

const route = useRoute('[view]');

<Content 
  onChange={(key, v) => {
    if (key === 'view') {
      route.setPath({ view: v || null })
    }
  }}
  style={{ 
    height: 'calc(100vh - 200px)', 
    border: \`1px solid \${color('lightborder')}\`,
    borderRadius: '10px'
  }}
  values={route.path} />`,
          },
        ]}
      />
    </div>
  )
}

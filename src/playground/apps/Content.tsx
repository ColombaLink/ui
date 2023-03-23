import React from 'react'
import ComponentViewer from '../ComponentViewer'

export const Content = () => {
  return (
    <div>
      <ComponentViewer
        title="Content"
        examples={[
          {
            code: `import { Content, useRoute, color } from '@based/ui'

const route = useRoute('[db]', { db: 'default' });

<Content 
  style={{ 
    height: 'calc(100vh - 200px)', 
    border: \`1px solid \${color('lightborder')}\`,
    borderRadius: '10px'
  }}
 value={route.path} />`,
          },
        ]}
      />
    </div>
  )
}

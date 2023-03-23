import React from 'react'
import ComponentViewer from '../ComponentViewer'

export const Content = () => {
  return (
    <div>
      <ComponentViewer
        title="Content"
        examples={[
          {
            code: `import { Content, useRoute } from '@based/ui'

const route = useRoute('[db]', { db: 'default' });

<Content value={route.path} />`,
          },
        ]}
      />
    </div>
  )
}

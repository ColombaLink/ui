import React from 'react'
import { Sidebar as MC } from '~/components/Sidebar'
import ComponentViewer from '../../ComponentViewer'

export const Schema = () => {
  return (
    <div>
      <ComponentViewer
        component={MC}
        propsName="SchemaProps"
        title="Schema"
        propsDef={{ name: 'schema', props: {}, code: '', file: '' }}
        examples={[
          {
            code: `import { Schema, color, useRoute, BasedIcon } from '@based/ui'

const route = useRoute('[db]/[type]/[...field]', { type: 'file', db: 'default' });

<Schema 
  style={{ 
    height: 600, 
    border: \`1px solid \${color('lightborder')}\`,
    borderRadius: '10px'
  }}
  values={route.path}
  onChange={(key, v) => {
    if (key === 'field') {
      route.setPath({ field: v})
    } else if (key === 'type') {
      route.setPath({ type: v, field: null })
    } else if (key === 'db') {
      route.setPath({ db: v, field: null, type: null })
    }
  }}
/>`,
          },
        ]}
      />
    </div>
  )
}

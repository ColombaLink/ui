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

const route = useRoute('[type]/[field]', { type: 'file' });

<Schema 
  style={{ 
    height: 600, 
    border: \`1px solid \${color('lightborder')}\`,
    borderRadius: '10px'
  }}
  values={{ ...route.path, field: route.path.field?.split('.') }}
  onChange={(key, v) => {
    console.log(key)
    if (key === 'field') {
      console.log('set f' , v, v.length ? v.join('.') : null )
      route.setPath({ field: v.length ? v.join('.') : null })
    } else if (key === 'type') {
      route.setPath({ type: v, field: null })
    }
  }}
/>`,
          },
        ]}
      />
    </div>
  )
}

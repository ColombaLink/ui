import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { Provider } from '@based/react'
import { adminClient, cluster, project, org, env } from '../based'

global.BasedAdminProvider = ({ children }) => {
  return <Provider client={adminClient}>{children}</Provider>
}

export const Infrastructure = () => {
  return (
    <div>
      <ComponentViewer
        title="Infrastructure"
        examples={[
          {
            code: `import { Infrastructure, useRoute, color } from '@based/ui'

const route = useRoute('[infraSection]');

<BasedAdminProvider>
  <Infrastructure 
    env={{
      project: '${project}',
      org: '${org}',
      env: '${env}',
      cluster: '${cluster}'
    }}
    values={{ ...route.path, expanded: route.query.expanded, filter: route.query.filter }}
    onChange={(key, v) => { 
      if (key === 'expanded' || key === 'filter') {
        if (!v || key === 'expanded' && Object.keys(v).length === 0) {
          route.setQuery({ [key]: null })
        } else {
          route.setQuery({ [key]: v })
        }
      } else {
        route.setPath({ [key]: v || null})
      }
    }}
    style={{ 
      height: 'calc(100vh - 200px)', 
      border: \`1px solid \${color('lightborder')}\`,
      borderRadius: '10px'
    }} />
</BasedAdminProvider>`,
          },
        ]}
      />
    </div>
  )
}

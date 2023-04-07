import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { Provider } from '@based/react'
import based from '@based/client'

const client = based({
  org: 'saulx',
  project: 'based-cloud',
  env: 'platform',
  name: '@based/admin-hub',
  cluster: 'local',
})

// const client = based({
//   org: 'saulx',
//   project: 'based-cloud',
//   env: 'platform',
//   name: '@based/admin-hub',
// })

// client.on('debug', (d) => {
//   console.info(d, new Date(Date.now()).toLocaleTimeString())
// })

client.call('login', {
  email: 'jim@saulx.com',
  code: ~~(Math.random() * 1e4),
  skipEmailForTesting: true,
})

global.BasedAdminProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>
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
      project: 'test',
      org: 'saulx',
      env: 'ci',
      // project: 'esc',
      // org: 'saulx',
      // env: 'dev',
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

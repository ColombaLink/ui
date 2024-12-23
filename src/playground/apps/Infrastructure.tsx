
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
            code: `import { Infrastructure, color } from '@based/ui'

<BasedAdminProvider>
  <Infrastructure 
    envAdminHub={basedClient}
    env={{
      project: '${project}',
      org: '${org}',
      env: '${env}',
      cluster: '${cluster}'
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

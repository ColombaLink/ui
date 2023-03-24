import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { Provider } from '@based/react'

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

const route = useRoute('[machine]');

<BasedAdminProvider>
  <Infrastructure 
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

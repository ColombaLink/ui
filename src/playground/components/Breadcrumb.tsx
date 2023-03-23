import React from 'react'
import { Breadcrumbs as Bc } from '~'
import ComponentViewer from '../ComponentViewer'

export const Breadcrumbs = () => {
  return (
    <ComponentViewer
      propsName="BreadcrumbsProps"
      examples={[
        {
          code: `import { Breadcrumbs, useRoute } from '@based/ui'

const route = useRoute('[step]', { step: 'schema' });

<Breadcrumbs 
  active={route.path.step} 
  onChange={(step) => route.setPath({ step })} 
  data={{
    schema: 'Set up your schema',
    content: 'Create content',
    api: 'Make your API accessible',
    integrate: 'Integrate your content with your front-end'
  }}
/>`,
        },
      ]}
      component={Bc}
    />
  )
}

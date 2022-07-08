import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { Tabs, Tab, Page } from '@based/ui'

<Tabs>
  <Tab title="title1">
    <Page>bla</Page>
  </Tab>
  <Tab title="title2">
    <Page>snurp</Page>
  </Tab>
</Tabs>`

export const TabsView = () => {
  return (
    <>
      <ComponentViewer
        examples={[
          {
            props: {
              code: codeExample,
            },
          },
        ]}
        component={Tabs}
      />
    </>
  )
}

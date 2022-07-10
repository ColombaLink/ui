import React from 'react'
import { Tabs } from '../../'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { Tabs, Tab, Page } from '@based/ui'

<Tabs activeTab={1}>
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
            code: codeExample,
          },
        ]}
        component={Tabs}
      />
    </>
  )
}

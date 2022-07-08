import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import { Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const TabsView = () => {
  const raw = `import { Tabs, Tab, Page } from '@based/ui'

<Tabs>
  <Tab title="title1">
    <Page>bla</Page>
  </Tab>
  <Tab title="title2">
    <Page>snurp</Page>
  </Tab>
</Tabs>`

  return (
    <>
      <ComponentViewer exampleCode={raw} component={Tabs} />
    </>
  )
}

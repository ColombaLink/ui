import React from 'react'
import { Tabs } from '../../'
import ComponentViewer from '../ComponentViewer'
import { StackIcon } from '~'

const codeExample = `import { Tabs, Tab, Page } from '@based/ui'

<Tabs activeTab={1}>
  <Tab label="label 1">
    <Page>bla</Page>
  </Tab>
  <Tab label="label 2">
    <Page>snurp</Page>
  </Tab>
</Tabs>`

const codeExample2 = `import { Tabs, Tab, Page, StackIcon, EditIcon } from '@based/ui'

<Tabs activeTab={1}>
  <Tab label="Component" icon={StackIcon} >
    <Page>bla</Page>
  </Tab>
  <Tab label="Design" icon={EditIcon}>
    <Page>snurp</Page>
  </Tab>
</Tabs>`

export const TabsView = () => {
  return (
    <>
      <ComponentViewer
        propsName="TabsProps"
        examples={[
          {
            code: codeExample,
          },
          {
            code: codeExample2,
          },
        ]}
        component={Tabs}
      />
    </>
  )
}

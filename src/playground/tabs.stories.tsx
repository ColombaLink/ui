import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import { Provider } from '~'

export const TabsOverview = () => {
  return (
    <Provider>
      <Tabs>
        <Tab title="Tab 1">Hello</Tab>
        <Tab title="Tab 2" isActive>
          Goodbye
        </Tab>
      </Tabs>
    </Provider>
  )
}

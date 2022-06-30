import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import { Provider, Container, Text } from '~'

export const TabsOverview = () => {
  return (
    <Provider>
      <Tabs space>
        <Tab title="Snurky">
          <Text>Text 1</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snark">
          <Container>
            <Text>Container Text</Text>
          </Container>
        </Tab>
      </Tabs>
    </Provider>
  )
}

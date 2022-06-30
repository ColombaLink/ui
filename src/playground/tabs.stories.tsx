import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import { Provider, Container, Text } from '~'

export const TabsOverview = () => {
  return (
    <Provider>
      <Tabs space>
        <Tab title="Snurky">
          <Container>
            <Text>Container Text</Text>
          </Container>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text</Text>
        </Tab>
        <Tab title="Snark"></Tab>
      </Tabs>
    </Provider>
  )
}

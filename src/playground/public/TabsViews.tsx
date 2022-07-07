import React from 'react'
import { Tabs, Tab } from '~/components/Tabs'
import { Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'
import { Code as CodeBox } from '~/components/Code'

export const TabsView = () => {
  const raw = `
  <Tabs>
    <Tab title="title1">{Content}</Tab>
    <Tab title="title2">{Content}</Tab>
  </Tabs>`

  return (
    <>
      <ComponentViewer component={Tabs} />

      <CodeBox>{raw}</CodeBox>

      <Tabs space>
        <Tab title="Snurky">
          <Text>Text 1</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snark">
          <Text>Text 3</Text>
        </Tab>
      </Tabs>
      <Tabs small space>
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
      <Tabs small space>
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
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
        <Tab title="Snorkles">
          <Text>Text 2</Text>
        </Tab>
      </Tabs>
    </>
  )
}

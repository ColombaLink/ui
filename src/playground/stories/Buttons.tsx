import React from 'react'
import { Button, CheckIcon, Code, Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  const codeExample = `
  import { Button } from '@based/ui'

  <Button onClick={() =>  async () => {
        await new Promise((resolve) => setTimeout(resolve, 1e3)),
  }}>
    Async button
  </Button>      
  `

  return (
    <>
      <ComponentViewer
        component={Button}
        propsName="ButtonProps"
        examples={[
          {
            props: {
              children: 'Just a button',
              onClick: () => alert('Clicked!'),
            },
          },
          {
            props: {
              children: 'Light button',
              light: true,
            },
          },
          {
            props: {
              children: 'Ghost button',
              ghost: true,
            },
          },
          {
            props: {
              children: 'Button with icon',
              outline: true,
              icon: <CheckIcon />,
              large: true,
            },
          },
          {
            props: {
              children: 'Light outline button',
              outline: true,
              light: true,
            },
          },
        ]}
      />
      <Container>
        <Text space>Async button example</Text>
        <Code value={codeExample} space />
        <Button
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1e3))
          }}
        >
          Async button
        </Button>
      </Container>
    </>
  )
}

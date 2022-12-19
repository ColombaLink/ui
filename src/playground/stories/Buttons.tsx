import React from 'react'
import { Button, CheckIcon, Code, Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  const codeExample = `
  import { Button } from '@based/ui'

  <Button onClick={async () => {
    await new Promise((resolve) => setTimeout(resolve, 1e3))
  }}>
    Async button
  </Button>      
  `

  const ButtonWithIcon = `
  import { Button, CheckIcon } from '@based/ui'

  <Button icon={CheckIcon}>
    Button with icon
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
              onClick: () => console.log('clicked'),
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
            code: ButtonWithIcon,
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

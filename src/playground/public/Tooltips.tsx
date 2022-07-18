import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { useToolTips } from '~/hooks/useToolTips'
import { Button, Text, Container, Avatar, Callout, Code } from '~'

export const Tooltips = () => {
  const tooltipListeners = useToolTips("I'm a tooltip", 'top')
  const tooltipListenersSec = useToolTips("I'm another tooltip", 'right')

  const codeExample = `
                                          // "text" , "position"
      const tooltipListeners = useToolTips("I'm a tooltip", 'top')

      <Text {...tooltipListeners}>Hover me</Text>
      <Button {...tooltipListeners}>Hover me</Button>
        
     
  `

  return (
    <>
      {/* <ComponentViewer
        component={Tooltip}
        examples={[
          {
            props: {
              label: 'Tooltip label',
              children: <Button>Hover me!</Button>,
            },
          },
          {
            props: {
              label: 'Tooltip label',
              position: 'top',
              children: <Button>Top Hover me!</Button>,
            },
          },
        ]}
      /> */}
      <Code space value={codeExample} />

      <Container style={{ width: 'fit-content' }} space>
        <Text {...tooltipListeners}>hover me</Text>
      </Container>

      <Container style={{ width: 'fit-content' }} space>
        <Callout {...tooltipListenersSec}>hover me</Callout>
      </Container>

      <Container style={{ width: 'fit-content' }}>
        <Button {...tooltipListenersSec}>hover me</Button>
      </Container>
    </>
  )
}

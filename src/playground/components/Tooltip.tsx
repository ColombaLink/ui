import React from 'react'

import { Text, Container, Callout, Code, useTooltip } from '~'

export const Tooltip = () => {
  const tooltipListeners = useTooltip("I'm a tooltip", 'top')
  const tooltipListenersSec = useTooltip("I'm another tooltip", 'right')

  const codeExample = `
      import { useToolTips } from '@based/ui'
      
                                          // "text" , "position"
      const tooltipListeners = useToolTips("I'm a tooltip", 'top')

      <Text {...tooltipListeners}>Hover me</Text>
      <Button {...tooltipListeners}>Hover me</Button>
        
     
  `

  return (
    <>
      <Code style={{ marginBottom: 24 }} value={codeExample} />

      <Container style={{ width: 'fit-content' }}>
        <Text {...tooltipListeners}>hover me</Text>
      </Container>

      <Container style={{ width: 'fit-content' }}>
        <Callout {...tooltipListenersSec}>hover me</Callout>
      </Container>
    </>
  )
}

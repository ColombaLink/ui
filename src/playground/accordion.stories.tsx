import React from 'react'
import { Accordion, AccordionItem } from '~/components/Accordion/Index'
import { Provider, Block, Input, Text, Button } from '~'

export const Accordions = () => {
  return (
    <Provider>
      <Block style={{ maxWidth: 760 }}>
        <Accordion>
          <Text space size="15px" weight={600} color="TextPrimary">
            Reference
          </Text>
          <AccordionItem title="1. Define relationship" checked>
            Hello
          </AccordionItem>
          <AccordionItem title="2. Field info">Bye Bye</AccordionItem>
          <AccordionItem title="3. Bi-directional">
            <Input label="Display name"></Input>
          </AccordionItem>
        </Accordion>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button>Enter</Button>
        </div>
      </Block>
    </Provider>
  )
}

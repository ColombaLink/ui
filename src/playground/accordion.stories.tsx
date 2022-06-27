import React from 'react'
import { Accordion, AccordionItem } from '~/components/Accordion/Index'
import { Provider, Block, Input, Text, Button } from '~'
import { Thumbnail } from '~/components/Thumbnail'
import { ReferenceIcon } from '~/icons'

export const Accordions = () => {
  return (
    <Provider>
      <Block style={{ maxWidth: 760 }}>
        <Accordion>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
          >
            <Thumbnail
              style={{ marginRight: 10 }}
              size="32px"
              backgroundColor="AccentTealLight"
            >
              <ReferenceIcon color="AccentTeal" />
            </Thumbnail>
            <Text size="15px" weight={600} color="TextPrimary">
              Reference
            </Text>
          </div>

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

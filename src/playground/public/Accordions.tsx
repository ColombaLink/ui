import React from 'react'
import { Container, Text, Input, Button } from '~'
import { Accordion, AccordionItem } from '~/components/Accordion/Index'
import { Thumbnail } from '~/components/Thumbnail'
import { ReferenceIcon } from '~/icons'
import { Code as CodeBox } from '~/components/Code'
import ComponentViewer from '../ComponentViewer'

export const Accordions = () => {
  const raw = `
  <Accordion>
    <AccordionItem title="title1">{Content}</AccordionItem>
    <AccordionItem title="title2">{Content}</AccordionItem>
  </Accordion>`

  return (
    <>
      <ComponentViewer component={Accordion} />

      <CodeBox space>{raw}</CodeBox>

      <Container style={{ maxWidth: 760 }}>
        <Accordion>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}
          >
            <Thumbnail
              style={{ marginRight: 10 }}
              size={32}
              color="Teal"
              icon={<ReferenceIcon />}
            />
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
      </Container>
    </>
  )
}

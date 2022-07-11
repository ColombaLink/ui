import React from 'react'
import { Accordion, AccordionItem, Text } from '../../'
import ComponentViewer from '../ComponentViewer'

export const Accordions = () => {
  const accordionCodeExample = `import { Accordion, AccordionItem, Text } from '@based/ui

  const Accordion = () => {}
 
  <Accordion>   
    <AccordionItem title="Bonjour"><Text>Bonjour</Text></AccordionItem>
    <AccordionItem title="Bonsoir"><Text>Bonsoir</Text></AccordionItem>
    <AccordionItem title="Bonne nuit"><Text>Bonne Nuit</Text></AccordionItem>
  </Accordion>    
  `

  return (
    <ComponentViewer
      component={Accordion}
      examples={[
        {
          props: {
            children: (
              <AccordionItem title="Accordion item title">
                <Text>Bonjour</Text>
              </AccordionItem>
            ),
          },
        },
        {
          props: {
            children: accordionCodeExample,
          },
        },
      ]}
    />
  )
}

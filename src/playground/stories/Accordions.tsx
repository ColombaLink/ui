import React from 'react'
import { Accordion, AccordionItem } from '~/components/Accordion'
import ComponentViewer from '../ComponentViewer'

export const Accordions = () => {
  return (
    <ComponentViewer
      component={Accordion}
      propsName="AccordionProps"
      examples={[
        {
          props: {
            children: (
              <>
                <AccordionItem label="Accordion item label">
                  Bonjour
                </AccordionItem>
                <AccordionItem label="Accordion item">Bonsoir</AccordionItem>
                <AccordionItem label="Accordion item">Bonne nuit</AccordionItem>
              </>
            ),
          },
        },
      ]}
    />
  )
}

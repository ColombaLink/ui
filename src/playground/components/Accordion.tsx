import React from 'react'
import {
  Accordion as AccordionComponent,
  AccordionItem,
} from '~/components/Accordion'
import ComponentViewer from '../ComponentViewer'

export const Accordion = () => {
  return (
    <ComponentViewer
      component={AccordionComponent}
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

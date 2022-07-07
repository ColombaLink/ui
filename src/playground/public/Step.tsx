import React from 'react'
import { Container } from '~/components/Container'
import { Steps } from '~/components/Steps'
import ComponentViewer from '../ComponentViewer'

export const Step = () => {
  return (
    <div>
      <ComponentViewer component={Steps} />
      <Container style={{ maxWidth: 442 }}>
        <Steps
          data={{
            'Set up your schema': '/step',
            'Create content': '#',
            'Make your API accessible': '/api',
            'Integrate your content with your front-end': '/integrate',
          }}
        />
      </Container>
    </div>
  )
}

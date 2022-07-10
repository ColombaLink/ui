import React from 'react'
import { Container } from '~/components/Container'
import { Steps } from '~/components/Steps'
import ComponentViewer from '../ComponentViewer'

export const Step = () => {
  return (
    <div>
      <ComponentViewer
        component={Steps}
        examples={[
          {
            props: {
              data: {
                'Set up your schema': '/step',
                'Create content': '#',
                'Make your API accessible': '/api',
                'Integrate your content with your front-end': '/integrate',
              },
            },
          },
        ]}
      />
    </div>
  )
}

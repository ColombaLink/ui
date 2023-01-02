import React from 'react'
import { Steps } from '~/components/Steps'
import ComponentViewer from '../ComponentViewer'

export const Step = () => {
  return (
    <ComponentViewer
      component={Steps}
      propsName="StepsProps"
      examples={[
        {
          props: {
            data: {
              'Set up your schema': '/',
              'Create content': '/snurp',
              'Make your API accessible': '/api',
              'Integrate your content with your front-end': '/integrate',
            },
          },
        },
      ]}
    />
  )
}

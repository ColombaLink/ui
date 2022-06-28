import React from 'react'
import { Block } from '~/components/Block'
import { Steps } from '~/components/Steps'

export const Step = () => {
  return (
    <div>
      <Block style={{ maxWidth: 442 }}>
        <Steps
          data={{
            'Set up your schema': '/',
            'Create content': '/create',
            'Make your API accessible': '/api',
            'Integrate your content with your front-end': '/integrate',
          }}
        />
      </Block>
    </div>
  )
}

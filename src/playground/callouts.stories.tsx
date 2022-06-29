import React from 'react'
import { Callout } from '~/components/Callout'
import { Provider } from '~'
import { CheckCircleIcon, ArrowRightIcon, ModelIcon, ErrorIcon } from '~'

export const Callouts = () => {
  return (
    <Provider>
      <Callout space>Normal regular callout</Callout>

      <Callout space outline style={{ maxWidth: 540 }}>
        Warning: This component has an outline. and max width
      </Callout>
      <Callout space outline iconLeft={ErrorIcon({ color: 'Brightpurple' })}>
        Warning: This component has an iconLeft.
      </Callout>

      <Callout space ghost>
        Ghost Message transparent background
      </Callout>
      <Callout space outline iconRight={ArrowRightIcon}>
        Message iconRight
      </Callout>
      <Callout
        space
        ghost
        outline
        iconLeft={<CheckCircleIcon color="Forestgreen" />}
      >
        Ghost Message transparent background and outline
      </Callout>
      <Callout
        space
        outline
        iconRight={ArrowRightIcon}
        iconLeft={ModelIcon}
        textAlign="center"
      >
        Message textAlign center
      </Callout>
      <Callout space iconRight={ArrowRightIcon} textAlign="right">
        Message textAlign right
      </Callout>
    </Provider>
  )
}

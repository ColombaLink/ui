import React from 'react'
import { Callout } from '~/components/Callout'
import { Provider } from '~'
import { CheckCircleIcon, ArrowRightIcon, ModelIcon, ErrorIcon } from '~'

export const Callouts = () => {
  return (
    <Provider>
      <Callout space>Normal regular callout</Callout>
      <Callout space error>
        Warning: This action is not reversible. Please be certain.
      </Callout>
      <Callout space error outline style={{ maxWidth: 540 }}>
        Warning: This component has an outline. and max width
      </Callout>
      <Callout space error outline iconLeft={ErrorIcon}>
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
        iconLeft={<CheckCircleIcon color="AccentForestgreen" />}
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
      <Callout
        space
        iconRight={ArrowRightIcon}
        textAlign="right"
        style={{
          backgroundColor: 'rgba(277,183,81,0.2)',
        }}
      >
        Message textAlign right
      </Callout>
    </Provider>
  )
}

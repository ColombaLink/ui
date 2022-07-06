import React from 'react'
import { Callout } from '~/components/Callout'
import { ErrorIcon, ArrowRightIcon, CheckCircleIcon, ModelIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'

export const Callouts = () => {
  return (
    <>
      <ComponentViewer component={Callout} />

      <Callout space color="Red" foregroundColor="PurpleDark">
        Normal regular callout
      </Callout>

      <Callout space backgroundColor="Red">
        Normal regular callout
      </Callout>

      <Callout space color="Red" outline>
        Normal regular callout
      </Callout>

      <Callout
        space
        color="Teal"
        outlineColor="Purple"
        foregroundColor="BlueSailor"
      >
        Normal regular callout
      </Callout>

      <Callout space outline style={{ maxWidth: 540 }}>
        Warning: This component has an outline. and max width
      </Callout>
      <Callout space iconLeft={ErrorIcon({ color: 'PurpleBright' })}>
        Warning: This component has an iconLeft.
      </Callout>

      <Callout space outline iconRight={ArrowRightIcon}>
        Message iconRight
      </Callout>
      <Callout
        space
        outline
        backgroundColor="Transparent"
        iconLeft={<CheckCircleIcon color="GreenForest" />}
      >
        BackgroundColor transparent background and outline
      </Callout>
      <Callout space outline ghost color="Orange" iconLeft={CheckCircleIcon}>
        You can also use ghost for transparancy
      </Callout>
      <Callout
        space
        outline
        iconRight={ArrowRightIcon}
        iconLeft={ModelIcon}
        textAlign="center"
        color="Green"
      >
        Message textAlign center
      </Callout>
      <Callout space iconRight={ArrowRightIcon} textAlign="right">
        Message textAlign right
      </Callout>
    </>
  )
}

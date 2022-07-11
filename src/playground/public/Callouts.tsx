import React from 'react'
import { Callout } from '~/components/Callout'
import { ErrorIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'

export const Callouts = () => {
  return (
    <>
      <ComponentViewer
        component={Callout}
        examples={[
          {
            props: {
              color: 'red',
              children: 'Normal regular callout',
            },
          },
          {
            props: {
              color: 'green',
              outline: true,
              children: 'Normal regular callout',
            },
          },
          {
            props: {
              style: { maxWidth: 540 },
              outline: true,
              iconLeft: <ErrorIcon />,
              children: 'Warning: This component has an outline. and max width',
            },
          },
        ]}
      />
    </>
  )
}

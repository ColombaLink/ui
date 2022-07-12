import React from 'react'
import { Callout } from '~/components/Callout'
import { ErrorIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'
import { Button } from '~/components/Button'

export const Callouts = () => {
  return (
    <>
      <ComponentViewer
        component={Callout}
        examples={[
          {
            props: {
              color: 'red',
              label: 'Normal regular callout',
            },
          },
          {
            props: {
              color: 'green',
              outline: true,
              label: 'Hello Label',
              icon: <ErrorIcon />,
              iconRight: <ErrorIcon />,
              description: 'This is a description',
              children: <Button>Child button</Button>,
            },
          },
          {
            props: {
              style: { maxWidth: 540 },
              outline: true,
              children: 'This component has an outline. and max width',
            },
          },
          {
            props: {
              label: 'Hello this is dog',
              description: 'This is a description',
              closeable: true,
            },
          },
        ]}
      />
    </>
  )
}

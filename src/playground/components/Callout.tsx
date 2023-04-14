import React from 'react'
import { Callout as CalloutComponent } from '~/components/Callout'
import { ErrorIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'
import { Button } from '~/components/Button'

export const Callout = () => {
  return (
    <ComponentViewer
      component={CalloutComponent}
      propsName="CalloutProps"
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
            description: 'This is a description',
            children: (
              <Button style={{ marginTop: 12 }} color="green">
                Child button
              </Button>
            ),
          },
        },
        {
          props: {
            style: { maxWidth: 540 },
            outline: true,
            icon: <ErrorIcon />,
            label: 'This component has an outline. and max width',
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
  )
}

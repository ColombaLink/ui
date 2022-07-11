import React from 'react'
import { Provider, DotIcon, CloseIcon, CheckCircleIcon } from '~'
import { Badge } from '~/components/Badge'
import ComponentViewer from '../ComponentViewer'

export const Badges = () => {
  return (
    <Provider>
      <ComponentViewer
        component={Badge}
        examples={[
          {
            props: {
              children: 'Badge',
            },
          },
          {
            props: {
              children: 'Another Badge',
              outline: true,
              ghost: true,
              iconLeft: <DotIcon />,
            },
          },
          {
            props: {
              children: 'Another one',
              color: 'green',
              iconRight: <CheckCircleIcon />,
            },
          },
          {
            props: {
              children: 'boxed',
              color: 'purple',
              boxed: true,
              outline: true,
            },
          },
        ]}
      />
    </Provider>
  )
}

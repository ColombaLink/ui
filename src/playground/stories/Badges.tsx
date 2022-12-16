import React from 'react'
import { DotIcon, CheckCircleIcon } from '~'
import { Badge } from '~/components/Badge'
import ComponentViewer from '../ComponentViewer'

export const Badges = () => {
  return (
    <>
      <ComponentViewer
        component={Badge}
        propsName="BadgeProps"
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
              icon: DotIcon,
            },
          },
          {
            props: {
              children: 'Another one',
              color: 'green',
              iconRight: CheckCircleIcon,
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
    </>
  )
}

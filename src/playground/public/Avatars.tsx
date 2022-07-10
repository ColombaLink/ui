import React from 'react'
import { Avatar } from '~/components/Avatar'
import { BasedIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Avatars = () => {
  return (
    <>
      <ComponentViewer
        component={Avatar}
        examples={[
          {
            props: {
              size: 32,
              color: 'Teal',
              label: 'blah',
            },
          },
          {
            props: {
              size: 40,
              color: 'GreenForest',
              label: 'Yo',
            },
          },
          {
            props: {
              icon: BasedIcon,
              size: 40,
              color: 'Red',
            },
          },
          {
            props: {
              icon: BasedIcon,
              size: 64,
              label: 'Hello',
              backgroundColor: 'Red',
              backgroundImg:
                'https://robohash.org/JBS.png?set=set2&size=150x150',
            },
          },
        ]}
      />
    </>
  )
}

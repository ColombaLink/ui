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
              color: 'teal',
              label: 'blah',
            },
          },
          {
            props: {
              size: 40,
              color: 'green',
              label: 'Yo',
            },
          },
          {
            props: {
              icon: BasedIcon,
              size: 40,
              color: 'red',
            },
          },
          {
            props: {
              icon: BasedIcon,
              size: 64,
              label: 'Hello',
              color: 'red',
              img: 'https://robohash.org/JBS.png?set=set2&size=150x150',
            },
          },
        ]}
      />
    </>
  )
}

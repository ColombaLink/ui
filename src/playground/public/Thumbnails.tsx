import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Thumbnails = () => {
  return (
    <>
      <ComponentViewer
        component={Thumbnail}
        examples={[
          {
            props: {
              size: 32,
              color: 'BlueBaby',
              icon: <TextIcon size={12} />,
            },
          },
          {
            props: {
              size: 40,
              color: 'GreenForest',
              label: 'Apples',
            },
          },
          {
            props: {
              size: 64,
              color: 'Mustard',
              backgroundImg:
                'https://robohash.org/ZCP.png?set=set1&size=150x150',
            },
          },
        ]}
      />
    </>
  )
}

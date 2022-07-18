import React from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Thumbnails = () => {
  return (
    <>
      <ComponentViewer
        component={Thumbnail}
        propsName="ThumbnailProps"
        examples={[
          {
            props: {
              size: 32,
              label: 'Snurpy',
            },
          },
          {
            props: {
              size: 40,
              color: 'green',
              label: 'Apples',
            },
          },
          {
            props: {
              size: 64,
              color: 'yellow',
              img: 'https://robohash.org/ZCP.png?set=set1&size=150x150',
            },
          },
        ]}
      />
    </>
  )
}

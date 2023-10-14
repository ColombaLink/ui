import React from 'react'
import { VideoPlayer as Player } from '~/components/VideoPlayer'
import ComponentViewer from '../ComponentViewer'

export const VideoPlayer = () => {
  return (
    <ComponentViewer
      component={Player}
      propsName="VideoPlayerProps"
      examples={[
        {
          props: {
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          },
        },
      ]}
    />
  )
}

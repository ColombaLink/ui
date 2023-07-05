import React from 'react'
import { VideoPlayer as Player } from '~/components/VideoPlayer'

export const VideoPlayer = () => {
  return (
    <div style={{ maxWidth: '640px' }}>
      <Player src="https://www.w3schools.com/html/mov_bbb.mp4" />
    </div>
  )
}

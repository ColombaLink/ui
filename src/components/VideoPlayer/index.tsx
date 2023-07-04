import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { TimeLine } from './TimeLine'
import { VideoControls } from './VideoControls'

export const VideoPlayer = ({ src }) => {
  const videoRef = useRef()

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  })

  useEffect(() => {
    if (playerState.isPlaying) {
      videoRef.current.play()
    } else if (!playerState.isPlaying) {
      videoRef.current.pause()
    }
  }, [playerState])

  return (
    <styled.div>
      <styled.video style={{ width: '100%' }} ref={videoRef}>
        <source src={src} type="video/mp4" />
        {/* <source src={src} type="video/ogg"> */}
        Your browser does not support the video tag.
      </styled.video>
      <TimeLine playerState={playerState} setPlayerState={setPlayerState} />
      <VideoControls
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    </styled.div>
  )
}

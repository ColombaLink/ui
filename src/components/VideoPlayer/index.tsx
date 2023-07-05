import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { TimeLine } from './TimeLine'
import { VideoControls } from './VideoControls'

export const VideoPlayer = ({ src }) => {
  const videoRef = useRef(undefined)

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    time: 0,
    speed: 1,
    isMuted: false,
  })

  useEffect(() => {
    playerState.isPlaying ? videoRef.current.play() : videoRef.current.pause()
  }, [playerState, videoRef])

  const handleOnTimeUpdate = () => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    setPlayerState({
      ...playerState,
      time: videoRef.current.currentTime,
      progress,
    })
  }

  console.log(playerState, '????')

  return (
    <styled.div>
      <styled.video
        style={{ width: '100%' }}
        ref={videoRef}
        onTimeUpdate={handleOnTimeUpdate}
      >
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

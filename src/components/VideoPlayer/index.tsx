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
    duration: undefined,
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

  const handleVideoProgress = (e) => {
    // const manualChange = Number(e)
    // videoRef.current.currentTime =
    //   (videoRef.current.duration / 100) * manualChange
    setPlayerState({
      ...playerState,
      progress: e,
    })
  }

  console.log(playerState, '????')
  // console.log('Vid REF??', videoRef?.current?.duration)

  return (
    <styled.div style={{ position: 'relative' }}>
      <styled.video
        style={{ width: '100%' }}
        ref={videoRef}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedMetadata={() => {
          setPlayerState({
            ...playerState,
            duration: videoRef.current.duration,
          })
        }}
        onClick={() => {
          setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
          })
        }}
      >
        <source src={src} type="video/mp4" />
        {/* <source src={src} type="video/ogg"> */}
        Your browser does not support the video tag.
      </styled.video>
      {/* <TimeLine playerState={playerState} setPlayerState={setPlayerState} /> */}
      <styled.div
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 100%)',
          position: 'absolute',
          bottom: 0,
          height: 108,
          left: 0,
          right: 0,
        }}
      />
      <VideoControls
        style={{ marginTop: -36 }}
        playerState={playerState}
        setPlayerState={setPlayerState}
        handleVideoProgress={handleVideoProgress}
      />
    </styled.div>
  )
}

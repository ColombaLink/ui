import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { TimeLine } from './TimeLine'
import { VideoControls } from './VideoControls'

export const VideoPlayer = ({ src }) => {
  const videoRef = useRef(undefined)

  const [timeLineClicked, setTimeLineClicked] = useState(false)
  const [fullScreen, setFullScreen] = useState(0)

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    // time: 0,
    speed: 1,
    isMuted: false,
    duration: undefined,
  })

  useEffect(() => {
    if (videoRef && playerState.progress !== 0) {
      videoRef.current.currentTime =
        (playerState.duration / 100) * playerState.progress
    }
  }, [timeLineClicked])

  useEffect(() => {
    playerState.isPlaying ? videoRef.current.play() : videoRef.current.pause()
  }, [playerState])

  useEffect(() => {
    if (fullScreen) {
      videoRef.current.requestFullscreen()
    }
  }, [fullScreen])

  const handleOnTimeUpdate = () => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    setPlayerState({
      ...playerState,
      //  time: videoRef.current.currentTime,
      progress,
    })
  }

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
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
          // videoRef.current.play()
          togglePlay()
        }}
      >
        <source src={src} type="video/mp4" />
        {/* <source src={src} type="video/ogg"> */}
        Your browser does not support the video tag.
      </styled.video>
      {/* <TimeLine playerState={playerState} setPlayerState={setPlayerState} /> */}
      <styled.div
        style={{
          pointerEvents: 'none',
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
        setTimeLineClicked={setTimeLineClicked}
        timeLineClicked={timeLineClicked}
        setFullScreen={setFullScreen}
      />
    </styled.div>
  )
}

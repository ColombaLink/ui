import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'inlines'
import { VideoControls } from './VideoControls'

export const VideoPlayer = ({ src }) => {
  const videoRef = useRef(undefined)

  const [timeLineClicked, setTimeLineClicked] = useState(false)
  const [fullScreen, setFullScreen] = useState(0)

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    volume: 1,
    duration: undefined,
  })

  useEffect(() => {
    if (videoRef && playerState.progress !== 0) {
      videoRef.current.currentTime =
        (playerState.duration / 100) * playerState.progress
    }
  }, [timeLineClicked])

  useEffect(() => {
    if (videoRef) {
      videoRef.current.volume = playerState.volume
    }
  }, [playerState.volume])

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
      (videoRef.current?.currentTime / videoRef.current.duration) * 100
    setPlayerState({
      ...playerState,
      progress,
    })
  }

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    })
  }

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
          togglePlay()
        }}
      >
        {src?.slice === 'mp4' ? (
          <source src={src} type="video/mp4" />
        ) : (
          <source src={src} type="video/ogg" />
        )}
        Your browser does not support the video tag.
      </styled.video>
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
        style={{ margin: 12, marginTop: -36 }}
        playerState={playerState}
        setPlayerState={setPlayerState}
        setTimeLineClicked={setTimeLineClicked}
        timeLineClicked={timeLineClicked}
        setFullScreen={setFullScreen}
      />
    </styled.div>
  )
}

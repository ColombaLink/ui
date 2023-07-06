import React from 'react'
import { styled } from 'inlines'
import {
  ExpandRightIcon,
  RedoIcon,
  StopIcon,
  AudioIcon,
  PauseIcon,
  color,
  Button,
  PlayIcon,
  Volume1Icon,
  FullScreenIcon,
} from '~'
import { TimeLine } from './TimeLine'

export const VideoControls = ({
  playerState,
  setPlayerState,
  style,
  handleVideoProgress,
}) => {
  return (
    <styled.div
      style={{
        height: 32,
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        position: 'absolute',
        padding: '8px',
        ...style,
      }}
    >
      {!playerState.isPlaying ? (
        <Button
          ghost
          icon={<PlayIcon style={{ color: 'white' }} />}
          onClick={() => {
            setPlayerState({
              ...playerState,
              isPlaying: true,
            })
          }}
        />
      ) : (
        <Button
          ghost
          icon={<PauseIcon style={{ color: 'white' }} />}
          onClick={() => {
            setPlayerState({
              ...playerState,
              isPlaying: false,
            })
          }}
        />
      )}
      <TimeLine
        playerState={playerState}
        setPlayerState={setPlayerState}
        handleVideoProgress={handleVideoProgress}
      />
      <Button icon={<Volume1Icon style={{ color: 'white' }} />} ghost />
      <Button icon={<FullScreenIcon style={{ color: 'white' }} />} ghost />
    </styled.div>
  )
}

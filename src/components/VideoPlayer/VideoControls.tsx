import React from 'react'
import { styled } from 'inlines'
import {
  ExpandRightIcon,
  RedoIcon,
  StopIcon,
  AudioIcon,
  color,
  Button,
  PlayIcon,
  MuteIcon,
  FullScreenIcon,
} from '~'
import { TimeLine } from './TimeLine'

export const VideoControls = ({ playerState, setPlayerState, style }) => {
  return (
    <styled.div
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 32,
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        position: 'absolute',
        // padding: '8px',
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
        <StopIcon
          size={18}
          onClick={() => {
            setPlayerState({
              ...playerState,
              isPlaying: false,
            })
          }}
        />
      )}
      <TimeLine playerState={playerState} setPlayerState={setPlayerState} />
      <Button icon={<MuteIcon />} />
      <Button icon={<FullScreenIcon />} />
    </styled.div>
  )
}

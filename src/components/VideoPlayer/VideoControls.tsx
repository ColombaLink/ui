import React from 'react'
import { styled } from 'inlines'
import { ExpandRightIcon, RedoIcon, StopIcon, AudioIcon, color } from '~'

export const VideoControls = ({ playerState, setPlayerState }) => {
  return (
    <styled.div
      style={{
        backgroundColor: color('text2'),
        height: 32,
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        padding: '8px',
      }}
    >
      {!playerState.isPlaying ? (
        <ExpandRightIcon
          size={18}
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

      <RedoIcon size={18} />
      <AudioIcon size={18} />
    </styled.div>
  )
}

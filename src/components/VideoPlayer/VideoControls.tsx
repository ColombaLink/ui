import React from 'react'
import { styled } from 'inlines'
import { PauseIcon, Button, PlayIcon, Volume1Icon, FullScreenIcon } from '~'
import { TimeLine } from './TimeLine'

export const VideoControls = ({
  playerState,
  setPlayerState,
  style,
  setTimeLineClicked,
  timeLineClicked,
  setFullScreen,
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
        setTimeLineClicked={setTimeLineClicked}
        timeLineClicked={timeLineClicked}
      />
      <Button icon={<Volume1Icon style={{ color: 'white' }} />} ghost />
      <Button
        icon={<FullScreenIcon style={{ color: 'white' }} />}
        ghost
        onClick={() => setFullScreen((prev) => (prev += 1))}
      />
    </styled.div>
  )
}

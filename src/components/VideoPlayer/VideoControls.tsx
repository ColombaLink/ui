import React from 'react'
import { styled } from 'inlines'
import {
  PauseIcon,
  Button,
  PlayIcon,
  Volume1Icon,
  FullScreenIcon,
  Volume3Icon,
  Volume2Icon,
  UnMuteIcon,
} from '~'
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
        width: 'calc(100% - 24px)',
        alignItems: 'center',
        display: 'flex',
        position: 'absolute',
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
      <Button
        icon={
          playerState.volume === 1 ? (
            <Volume3Icon style={{ color: 'white' }} />
          ) : playerState.volume === 0 ? (
            <UnMuteIcon style={{ color: 'white' }} />
          ) : playerState.volume === 0.33 ? (
            <Volume1Icon style={{ color: 'white' }} />
          ) : playerState.volume === 0.66 ? (
            <Volume2Icon style={{ color: 'white' }} />
          ) : (
            <Volume1Icon style={{ color: 'white' }} />
          )
        }
        ghost
        onClick={() => {
          if (playerState.volume === 1) {
            setPlayerState({
              ...playerState,
              volume: 0,
            })
          } else if (playerState.volume === 0) {
            setPlayerState({
              ...playerState,
              volume: 0.33,
            })
          } else if (playerState.volume === 0.33) {
            setPlayerState({
              ...playerState,
              volume: 0.66,
            })
          } else if (playerState.volume === 0.66) {
            setPlayerState({
              ...playerState,
              volume: 1,
            })
          }
        }}
      />
      <Button
        icon={<FullScreenIcon style={{ color: 'white' }} />}
        ghost
        onClick={() => setFullScreen((prev) => (prev += 1))}
      />
    </styled.div>
  )
}

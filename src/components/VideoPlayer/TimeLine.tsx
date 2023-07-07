import React, { useRef } from 'react'
import { styled } from 'inlines'
import { color, Text } from '~'

export const TimeLine = ({ playerState, setPlayerState }) => {
  const bigRef = useRef(null)

  const getPercentage = (width, posX) => {
    const onePercent = width / 100
    return posX / onePercent
  }

  return (
    <styled.div
      style={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <styled.div style={{ marginRight: 12 }}>
        <Text color="background2" typography="caption500">
          {!playerState.isPlaying
            ? '0.00'
            : ((playerState.duration / 100) * playerState.progress).toFixed(2)}
        </Text>
      </styled.div>

      <styled.div
        ref={bigRef}
        style={{
          width: '100%',
          height: '20px',
          background: 'transparent',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
        onClick={(e) => {
          const bigRefBoundingClientRect =
            bigRef.current.getBoundingClientRect()

          const progressPercentage = getPercentage(
            bigRef.current.clientWidth,
            e.clientX - bigRefBoundingClientRect.left
          )

          setPlayerState({
            ...playerState,
            //    time: newTime,
            progress: progressPercentage,
          })

          // TODO update current time on video ref
        }}
      >
        <styled.div
          style={{
            width: '100%',
            height: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.20)',
            position: 'absolute',
            pointerEvents: 'none',
            top: 8,
          }}
        />
        <styled.div
          style={{
            width: `${playerState.progress}%`,
            height: 4,
            borderRadius: 4,
            backgroundColor: color('accent'),
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          <styled.div
            style={{
              width: 4,
              height: 18,
              borderRadius: 5,
              // border: `1px solid ${color('border')}`,
              backgroundColor: 'white',
              position: 'absolute',
              right: -2,
              top: -7,
            }}
          />
          {/* <styled.div
            style={{
              backgroundColor: 'text2',
              padding: '3px 6px',
              border: `1px solid ${color('border')}`,
              borderRadius: '4px',
              position: 'absolute',
              right: -20,
              top: -42,
            }}
          >
            {playerState.time.toFixed(2)}
          </styled.div> */}
        </styled.div>
      </styled.div>
      <styled.div style={{ width: 32, marginLeft: 12 }}>
        <Text color="background2" typography="caption500">
          {playerState.duration?.toFixed(2)}
        </Text>
      </styled.div>
    </styled.div>
  )
}

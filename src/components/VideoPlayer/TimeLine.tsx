import React, { useRef, useState } from 'react'
import { styled } from 'inlines'
import { color, Text } from '~'

export const TimeLine = ({
  playerState,
  setPlayerState,
  handleVideoProgress,
}) => {
  const bigRef = useRef(null)

  const [percentage, setPercentage] = useState(55)

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
          {!playerState.isPlaying ? '0.00' : playerState.time.toFixed(2)}
        </Text>
      </styled.div>

      <styled.div
        ref={bigRef}
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.20)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={(e) => {
          // TODO set progress

          console.log(bigRef.current.clientWidth - e.clientX, 'WIDTH??')

          console.log('E ', e)

          // console.log(e.clientX, 'pixeltjes')

          // console.log(bigRef.current.offsetLeft, 'offset left')

          // setPercentage(
          //   getPercentage(
          //     bigRef.current.clientWidth,
          //     e.clientX - e.target.offsetLeft
          //   )
          // )

          console.log(
            '?? Percentage ⚡️',
            getPercentage(
              bigRef.current.clientWidth,
              e.clientX - bigRef.current.offsetLeft
            )
          )

          handleVideoProgress(percentage)
        }}
      >
        <styled.div
          style={{
            width: `${playerState.progress}%`,
            height: 4,
            borderRadius: 4,
            backgroundColor: color('accent'),
            position: 'relative',
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

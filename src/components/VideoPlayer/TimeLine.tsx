import React, { useRef, useState } from 'react'
import { styled } from 'inlines'
import { color } from '~'

export const TimeLine = ({ playerState, setPlayerState }) => {
  const bigRef = useRef(null)

  const [percentage, setPercentage] = useState(55)

  const getPercentage = (width, posX) => {
    const onePercent = width / 100
    return posX / onePercent
  }

  return (
    <styled.div
      ref={bigRef}
      style={{
        width: '100%',
        height: '20px',
        backgroundColor: color('text'),
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={(e) => {
        setPercentage(
          getPercentage(
            bigRef.current.clientWidth,
            e.clientX - e.target.offsetLeft
          )
        )
      }}
    >
      <styled.div
        style={{
          width: `${percentage}%`,
          height: 4,
          backgroundColor: color('accent'),
          position: 'relative',
        }}
      >
        <styled.div
          style={{
            width: 12,
            height: 12,
            borderRadius: 5,
            border: `1px solid ${color('border')}`,
            backgroundColor: color('background'),
            position: 'absolute',
            right: -5,
            top: -4,
          }}
        />
        <styled.div
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
          {Math.round(percentage)}%
        </styled.div>
      </styled.div>
    </styled.div>
  )
}

import React, { FC, useState, useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { color } from '~/utils'

type ValueSliderProps = {}

type TrackProps = {}

type ThumbProps = {
  value: number
}

type LabelProps = {
  value: number
}

export const ValueSlider: FC<ValueSliderProps> = () => {
  return (
    <div>
      <Track />
    </div>
  )
}

export const Track: FC<TrackProps> = () => {
  const [value, setValue] = useState(40)
  const [trackWidth, setTrackWidth] = useState(0)

  const trackRef = useRef()

  useEffect(() => {
    setTrackWidth(trackRef.current.offsetWidth)
  }, [])

  const toPercentages = (num) => {
    return num / (trackWidth / 100)
  }

  return (
    <styled.div
      ref={trackRef}
      onClick={(e) => {
        setValue(Math.floor(toPercentages(e.clientX - e.target.offsetLeft)))
      }}
      style={{
        width: '100%',
        height: 6,
        backgroundColor: color('lightgrey:active'),
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        '&:before': {
          content: '""',
          position: 'absolute',
          left: '0px',
          width: `${value}%`,
          height: '6px',
          backgroundColor: color('accent'),
          borderRadius: '3px',
        },
      }}
    >
      <Label value={value} />
      <Thumb value={value} />
    </styled.div>
  )
}

export const Thumb: FC<ThumbProps> = ({ value }) => {
  return (
    <styled.div
      style={{
        position: 'absolute',
        left: `calc(${value}% - 8px)`,
        cursor: 'pointer',
        width: 16,
        height: 16,
        backgroundColor: color('lightgrey'),
        border: `4px solid ${color('accent')}`,
        borderRadius: '8px',
      }}
    ></styled.div>
  )
}

export const Label: FC<LabelProps> = ({ value }) => {
  return (
    <styled.div
      style={{
        position: 'absolute',
        left: `${value}%`,
        transform: 'translateX(-50%)',
        top: '-50px',
        textAlign: 'center',
        display: 'block',
        backgroundColor: color('lightgrey'),
        padding: '5px',
        borderRadius: '4px',
        border: `1px solid ${color('border')}`,
      }}
    >
      label {value}%
    </styled.div>
  )
}

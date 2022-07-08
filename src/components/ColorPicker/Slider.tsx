import React from 'react'

export const Slider = ({ max, value, step = 1, onChange, style }) => {
  return (
    <div
      style={{
        height: 30,
        position: 'relative',
        ...style,
      }}
    >
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
        }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: `${(value / max) * 100}%`,
          width: 20,
          bottom: 0,
          backgroundColor: 'white',
          transform: `translate3d(-${(value / max) * 100}%,0,0)`,
        }}
      />
    </div>
  )
}

import React, { CSSProperties } from 'react'
import { Slider } from './Slider'
import type { RGB } from './types'
export const AlphaSlider = ({
  rgb,
  alpha,
  onChange,
  style,
}: {
  rgb: RGB
  alpha: number
  onChange: (alpha: number) => void
  style?: CSSProperties
}) => {
  const rgbString = rgb.join(',')
  return (
    <div
      style={{
        background:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
      }}
    >
      <Slider
        value={alpha}
        max={1}
        step={0.01}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, rgba(${rgbString}, 0) 0%, rgb(${rgbString}) 100%)`,
          ...style,
        }}
      />
    </div>
  )
}

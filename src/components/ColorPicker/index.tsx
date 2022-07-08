import React, { useState } from 'react'
import { AlphaSlider } from './AlphaSlider'
import { HueSlider } from './HueSlider'
import { Inputs } from './Inputs'
import { RgbPicker } from './RgbPicker'
import { Swatch } from './Swatch'
import { rgbToXY, xyToRgb, rgbToHue } from './utils'
import { color } from '~'
import type { RGB } from './types'

export const ColorPicker = ({ rgba = [255, 0, 0, 1] }) => {
  const [rgb, setRgb] = useState(rgba.slice(0, 3) as RGB)
  const [hue, setHue] = useState(rgba.slice(0, 3) as RGB)
  const [alpha, setAlpha] = useState(rgba[3] || 1)
  const colorValue = `rgba(${rgb.join(',')},${alpha})`

  return (
    <div
      style={{
        border: `1px solid ${color('OtherDivider')}`,
        borderRadius: 4,
        padding: 16,
      }}
    >
      <RgbPicker
        hue={hue}
        rgb={rgb}
        onChange={setRgb}
        style={{
          marginBottom: 8,
        }}
      />
      <div style={{ display: 'flex', marginBottom: 8 }}>
        <div style={{ flexGrow: 1, marginRight: 8 }}>
          <HueSlider
            hue={hue}
            onChange={(newHue) => {
              const { x, y } = rgbToXY(rgb, hue)
              const newRgb = xyToRgb(x, y, newHue)
              setRgb(newRgb)
              setHue(newHue)
            }}
            style={{
              marginBottom: 8,
            }}
          />
          <AlphaSlider rgb={rgb} alpha={alpha} onChange={setAlpha} />
        </div>
        <Swatch color={colorValue} size={48} />
      </div>
      <Inputs
        rgb={rgb}
        alpha={alpha}
        onRgbChange={(newRgb) => {
          const newHue = rgbToHue(newRgb)
          setRgb(newRgb)
          setHue(newHue)
        }}
        onAlphaChange={setAlpha}
      />
    </div>
  )
}

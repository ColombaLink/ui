import React, { useState } from 'react'
import { AlphaSlider } from './AlphaSlider'
import { HueSlider } from './HueSlider'
import { RgbaInput } from './RgbaInput'
import { RgbPicker } from './RgbPicker'
import { Swatch } from './Swatch'
import { rgbToXY, xyToRgb, rgbToHue } from './utils'
import { color } from '~'

export const ColorPicker = ({ rgba = [255, 0, 0, 1] }) => {
  const [rgb, setRgb] = useState(rgba.slice(0, 3))
  const [hue, setHue] = useState(rgba.slice(0, 3))
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
      <RgbPicker hue={hue} rgb={rgb} onChange={setRgb} />
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <HueSlider
            hue={hue}
            onChange={(newHue) => {
              const { x, y } = rgbToXY(rgb, hue)
              const newRgb = xyToRgb(x, y, newHue)
              setRgb(newRgb)
              setHue(newHue)
            }}
          />
          <AlphaSlider rgb={rgb} alpha={alpha} onChange={setAlpha} />
        </div>
        <Swatch color={colorValue} />
      </div>
      <RgbaInput
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

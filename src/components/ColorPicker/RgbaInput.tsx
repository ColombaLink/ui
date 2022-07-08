import React from 'react'
import { Input } from '~'
import { minmax } from './utils'

export const RgbaInput = ({ rgb, alpha, onRgbChange, onAlphaChange }) => {
  const [r, g, b] = rgb
  return (
    <div style={{ display: 'flex' }}>
      <Input
        type="number"
        value={Math.round(r)}
        onChange={(r) => onRgbChange([minmax(0, r, 255), g, b])}
      />
      <Input
        type="number"
        value={Math.round(g)}
        onChange={(g) => onRgbChange([r, minmax(0, g, 255), b])}
      />
      <Input
        type="number"
        value={Math.round(b)}
        onChange={(b) => onRgbChange([r, g, minmax(0, b, 255)])}
      />
      <Input type="number" value={alpha} onChange={onAlphaChange} />
    </div>
  )
}

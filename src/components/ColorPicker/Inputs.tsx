import React, { useState } from 'react'
import { Input } from '~'
import { minmax, toHex } from './utils'

export const Inputs = ({ rgb, alpha, onRgbChange, onAlphaChange }) => {
  const [r, g, b] = rgb
  const margin = { marginRight: 8 }
  const [hex, setHex] = useState(
    `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
  )
  return (
    <div style={{ display: 'flex' }}>
      <Input
        style={margin}
        value={hex}
        suggest={(v) => {
          return v.padEnd(6, '0')
        }}
        onChange={(v) => {
          const str = v.padEnd(6, '0')
          const r = parseInt(str.substring(0, 2), 16)
          const g = parseInt(str.substring(2, 4), 16)
          const b = parseInt(str.substring(4, 6), 16)

          if (r <= 255 && g <= 255 && b <= 255) {
            onRgbChange([r, g, b])
            setHex(v.toUpperCase())
          }
        }}
      />
      <Input
        style={margin}
        type="number"
        value={Math.round(r)}
        onChange={(r) => onRgbChange([minmax(0, r, 255), g, b])}
      />
      <Input
        style={margin}
        type="number"
        value={Math.round(g)}
        onChange={(g) => onRgbChange([r, minmax(0, g, 255), b])}
      />
      <Input
        style={margin}
        type="number"
        value={Math.round(b)}
        onChange={(b) => onRgbChange([r, g, minmax(0, b, 255)])}
      />
      <Input type="number" value={alpha} onChange={onAlphaChange} />
    </div>
  )
}

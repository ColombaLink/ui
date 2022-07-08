import React, { useEffect, useState } from 'react'
import { Input } from '~'
import { minmax, toHex } from './utils'

const HexInput = ({ r, g, b, onRgbChange }) => {
  return (
    <Input
      value={`${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()}
      suggest={(v) => v.padEnd(6, '0')}
      transform={(v) =>
        v
          .toUpperCase()
          .replace(/[^A-F0-9]/g, '')
          .slice(0, 6)
      }
      forceSuggestion
      noInterrupt
      onChange={(v) => {
        const str = v.padEnd(6, '0')
        const r = parseInt(str.substring(0, 2), 16)
        const g = parseInt(str.substring(2, 4), 16)
        const b = parseInt(str.substring(4, 6), 16)

        if (r <= 255 && g <= 255 && b <= 255) {
          onRgbChange([r, g, b])
        }
      }}
    />
  )
}

export const Inputs = ({ rgb, alpha, onRgbChange, onAlphaChange }) => {
  let [r, g, b] = rgb
  const margin = { marginLeft: 8 }

  r = Math.round(r)
  b = Math.round(b)
  g = Math.round(g)

  return (
    <div style={{ display: 'flex' }}>
      <HexInput r={r} g={g} b={b} onRgbChange={onRgbChange} />
      <Input
        style={margin}
        type="number"
        value={r}
        onChange={(r) => onRgbChange([minmax(0, r, 255), g, b])}
      />
      <Input
        style={margin}
        type="number"
        value={g}
        onChange={(g) => onRgbChange([r, minmax(0, g, 255), b])}
      />
      <Input
        style={margin}
        type="number"
        value={b}
        onChange={(b) => onRgbChange([r, g, minmax(0, b, 255)])}
      />
      <Input
        style={margin}
        type="number"
        value={alpha}
        onChange={onAlphaChange}
      />
    </div>
  )
}

import { styled } from 'inlines'
import React, { useEffect, useState } from 'react'
import { Input } from '~'
import { minmax, toHex } from './utils'

const HexInput = ({ r, g, b, onRgbChange }) => {
  return (
    <Input
      style={{ flexGrow: 1 }}
      value={`${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()}
      suggest={(v) => v.padEnd(6, v.slice(-1) || '0')}
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

const NumberInput = styled(Input, { marginLeft: 8, width: 52, flexShrink: 0 })
const max225 = (v) => (v ? Math.round(minmax(0, v, 255)) : v)
const max100 = (v) => (v ? Math.round(minmax(0, v, 100)) : v)

export const Inputs = ({ rgb, alpha, onRgbChange, onAlphaChange }) => {
  let [r, g, b] = rgb

  r = Math.round(r)
  b = Math.round(b)
  g = Math.round(g)

  return (
    <div style={{ display: 'flex' }}>
      <HexInput r={r} g={g} b={b} onRgbChange={onRgbChange} />
      <NumberInput
        type="number"
        value={r}
        onChange={(r) => onRgbChange([minmax(0, r, 255), g, b])}
        transform={max225}
        placeholder="R"
      />
      <NumberInput
        type="number"
        value={g}
        onChange={(g) => onRgbChange([r, minmax(0, g, 255), b])}
        transform={max225}
        placeholder="G"
      />
      <NumberInput
        type="number"
        value={b}
        onChange={(b) => onRgbChange([r, g, minmax(0, b, 255)])}
        transform={max225}
        placeholder="B"
      />
      <NumberInput
        type="number"
        value={Math.round(alpha * 100)}
        onChange={(n) => onAlphaChange(n / 100)}
        transform={max100}
        placeholder="A"
      />
    </div>
  )
}

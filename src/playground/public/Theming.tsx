import React, { useEffect, useState } from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon, Input, font } from '~'
import { styled } from 'inlines'
import { ColorPicker } from '~'
const div = document.createElement('div')
document.documentElement.appendChild(div)

const getSaturation = (r, g, b) => (~~r + ~~g + ~~b) / (255 * 3)

const textColorFor = (str) => {
  const [r, g, b] = rgbaToArr(str)
  return getSaturation(r, g, b) > 0.5 ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
}

const hoverColorFor = (str) => {
  let [r, g, b, a] = rgbaToArr(str)
  // const saturation = getSaturation(r, g, b)
  // const incr = ~~(10 * (saturation * 2 - 1) * (1 / a)) + 10
  // return saturation < 0.5
  //   ? `rgba(${r + incr}, ${g + incr}, ${b + incr}, ${a})`
  //   : `rgba(${r - incr}, ${g - incr}, ${b - incr}, ${a})`

  const saturation = getSaturation(r, g, b)
  let incr = 10 * (saturation * 2 - 1)
  let hr = r,
    hg = g,
    hb = b

  if (saturation < 0.5) {
    incr += 20 * saturation + 10
  }

  incr *= 1 / a

  r = Math.round(r / 127)
  b = Math.round(b / 127)
  g = Math.round(g / 127)

  if (r <= g || r <= b) {
    hr = hr - incr
  }
  if (g <= r || g <= b) {
    hg = hg - incr
  }
  if (b <= r || b <= g) {
    hb = hb - incr
  }
  return `rgba(${~~hr},${~~hg},${~~hb},${a})`
}

const rgbaToArr = (str) => {
  const [, r, g, b, a] = str.split(/, |,|\(|\)/)
  return [~~r, ~~g, ~~b, Number(a) || 1]
}

const toHex = (n) => Number(n).toString(16).padStart(2, 0)

const rgbaToHex = (str) => {
  const [r, g, b] = rgbaToArr(str)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const Row = ({ name, value = 'rgba(0,0,0,1)' }) => {
  const [rgba, setRGBA] = useState(value)
  const hoverColor = hoverColorFor(rgba)
  const activeColor = hoverColorFor(hoverColor)
  return (
    <tr>
      <td style={{ textAlign: 'left' }}>{name}</td>
      <styled.td
        style={{
          cursor: 'pointer',
          backgroundColor: rgba,
          color: textColorFor(rgba),
          '&:hover': {
            backgroundColor: hoverColor,
            color: textColorFor(hoverColor),
          },
          '&:active': {
            backgroundColor: activeColor,
            color: textColorFor(activeColor),
          },
        }}
      >
        <label>
          <input
            type="color"
            style={{ display: 'none' }}
            value={rgbaToHex(rgba)}
            onChange={(e) => {
              div.style.color = e.target.value
              const [r, g, b, a] = rgbaToArr(getComputedStyle(div).color)
              setRGBA(`rgba(${r},${g},${b},${a || 1})`)
            }}
          />
          {rgba}
        </label>
      </styled.td>
      <td
        style={{
          backgroundColor: hoverColor,
          color: textColorFor(hoverColor),
        }}
      >
        {hoverColor}
      </td>
      <td
        style={{
          backgroundColor: activeColor,
          color: textColorFor(activeColor),
        }}
      >
        {activeColor}
      </td>
    </tr>
  )
}

export const Theming = () => {
  return (
    <>
      <Input label="Primary" type="color" />
      <br />
      <ColorPicker />

      <table style={font()}>
        <thead>
          <tr>
            <td>Color</td>
            <td>Default</td>
            <td>Hover</td>
            <td>Active</td>
          </tr>
        </thead>
        <styled.tbody
          style={{
            fontWeight: 400,
            '*': {
              userSelect: 'text',
              height: '50px',
              width: '200px',
              textAlign: 'center',
            },
          }}
        >
          <Row name="Primary" value="rgba(61,83,231)" />
          <Row name="PrimaryLight" value="rgba(131,145,237,0.12)" />
          <Row name="Text" value="rgba(15,16,19,0.87)" />
          {/* <Row name="Text" value="rgba(13,14,16,1)" /> */}
          <Row name="TextLight" value="rgba(15,16,19,0.60)" />
          <Row name="Background0dp" value="rgba(247,247,248,1)" />
          <Row name="Background1dp" value="rgba(255,255,255,1)" />
          <Row name="Background2dp" value="rgba(255,255,255,1)" />
          <Row name="Background3dp" value="rgba(255,255,255,1)" />
          <Row name="Overlay" value="rgba(15,16,19, 0.24)" />
        </styled.tbody>
      </table>
    </>
  )
}

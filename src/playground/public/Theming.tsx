import React, { useState } from 'react'
import { Thumbnail } from '~/components/Thumbnail'
import { TextIcon, MarkDownIcon, AttachmentIcon, Input, font } from '~'

const div = document.createElement('div')
document.documentElement.appendChild(div)

const colorOn = (r, g, b) => {
  const saturation = (~~r + ~~g + ~~b) / (255 * 3)
  return saturation > 0.5 ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
}

const Row = ({ name }) => {
  const [[r, g, b, a], setRGBA] = useState([0, 0, 0, 1])
  const rgba = `rgba(${r},${g},${b},${a || 1})`

  return (
    <tr>
      <td style={{ backgroundColor: rgba, color: colorOn(r, g, b) }}>
        <label>
          <input
            type="color"
            style={{ display: 'none' }}
            value={'red'}
            onChange={(e) => {
              div.style.color = e.target.value
              const [, r, g, b, a] =
                getComputedStyle(div).color.split(/, |,|\(|\)/)
              setRGBA([r, g, b, a || 1])
            }}
          />
          {rgba}
        </label>
      </td>
    </tr>
  )
}

export const Theming = () => {
  return (
    <>
      <Input label="Primary" type="color" />
      <br />
      <table style={font()}>
        <thead>
          <tr>
            <td>Color</td>
            <td>Active</td>
            <td>Hover</td>
          </tr>
        </thead>
        <tbody style={{ fontWeight: 400 }}>
          <Row name="PrimaryMain" />
          <Row name="Text" />
          <Row name="Background0dp" />
          <Row name="Background1dp" />
          <Row name="Background2dp" />
          <Row name="Background3dp" />
        </tbody>
      </table>
    </>
  )
}

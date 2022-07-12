import { Text } from '~/components/Text'
import { baseTheme } from '~/theme/baseTheme'
import { values } from '~/theme'
import React, { useEffect } from 'react'
import { styled } from 'inlines'
import { border, Color, color, font } from '~/utils'
import { transparent } from '~/components/ColorPicker/bg'
import { useColorPicker, useHover } from '~/hooks'
import useLocalStorage from '@based/use-local-storage'
import { rgbaToArr } from '~/components/ColorPicker/utils'
import { DeleteIcon } from '~/icons'
import { Button } from '~/components/Button'
import { useDarkMode } from '~/hooks/useDarkMode'

const ColorCell = ({ name, variant = null, onChange }) => {
  const key = variant ? `${name}:${variant}` : name
  const value = `rgba(${values[key].join(',')})`
  const { onClick } = useColorPicker(value, (rgba) =>
    onChange(name, variant, rgba)
  )
  return (
    <td style={{ background: transparent, margin: 0, padding: 0 }}>
      <styled.button
        onClick={onClick}
        style={{
          padding: 8,
          background: color(name, variant),
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          ...font({
            color: name,
            variant: variant == 'contrast' ? null : 'contrast',
          }),
          '&:hover': {
            background: color(name, 'hover'),
            color: color(name, 'contrast'),
          },
          '&:active': {
            background: color(name, 'active'),
          },
        }}
      >
        Lorem Ipsum
      </styled.button>
    </td>
  )
}

const Colors = ({ light, onChange }) => {
  const onChangeWrapper = (name, variant, rgba) =>
    onChange(name, variant, light, rgba)
  return (
    <>
      {Object.keys(baseTheme.colors).map((key: Color) => {
        const name = light ? `light${key}` : key
        return (
          <tr key={name}>
            <td
              style={{
                ...font(),
                textAlign: 'right',
                paddingRight: 16,
                width: 64,
              }}
            >
              {name}
            </td>
            <ColorCell name={name} onChange={onChangeWrapper} />
            <ColorCell
              name={name}
              onChange={onChangeWrapper}
              variant="active"
            />
            <ColorCell name={name} onChange={onChangeWrapper} variant="hover" />
            <ColorCell
              name={name}
              onChange={onChangeWrapper}
              variant="border"
            />
            <ColorCell
              name={name}
              onChange={onChangeWrapper}
              variant="contrast"
            />
          </tr>
        )
      })}
    </>
  )
}

export const Theming = () => {
  const [currentThemes, setThemes] = useLocalStorage('themes')
  const [isDarkMode] = useDarkMode()
  const onChange = (name, variant, light, val) => {
    const k = isDarkMode ? 'dark' : 'base'
    const key = light ? 'light' : 'colors'
    const themes = currentThemes ? { ...currentThemes } : {}
    if (!themes[k]) themes[k] = {}
    if (!themes[k][key]) themes[k][key] = {}
    if (!themes[k][key][name]) themes[k][key][name] = {}
    themes[k][key][name][variant?.substring(0, 1) || 'm'] = rgbaToArr(val)
    setThemes(themes)
  }
  return (
    <table style={{ ...font(), width: '100%' }}>
      <thead
        style={{
          position: 'sticky',
          top: -32,
          background: color('background'),
          borderBottom: border(1),
        }}
      >
        <tr>
          <td>
            {currentThemes ? (
              <Button
                ghost
                icon={DeleteIcon}
                onClick={() => {
                  setThemes(null)
                  location.reload()
                }}
              >
                Reset Theme
              </Button>
            ) : null}
          </td>
          <td>Main</td>
          <td>Active</td>
          <td>Hover</td>
          <td>Border</td>
          <td>Contrast</td>
        </tr>
      </thead>
      <styled.tbody
        style={{
          fontWeight: 400,
          '*': {
            userSelect: 'text',
            height: '50px',
            width: '200px',
          },
        }}
      >
        <Colors onChange={onChange} />
        <Colors onChange={onChange} light />
      </styled.tbody>
    </table>
  )
}

// import React, { useEffect, useState } from 'react'
// import { Thumbnail } from '~/components/Thumbnail'
// import { TextIcon, MarkDownIcon, AttachmentIcon, Input, font } from '~'
// import { styled } from 'inlines'
// import { ColorPicker } from '~'
// import { rgbaToArr } from '~/components/ColorPicker/utils'
// const div = document.createElement('div')
// document.documentElement.appendChild(div)

// const getSaturation = (r, g, b) => (~~r + ~~g + ~~b) / (255 * 3)

// const textColorFor = (str) => {
//   const [r, g, b] = rgbaToArr(str)
//   return getSaturation(r, g, b) > 0.5 ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
// }

// const hoverColorFor = (str) => {
//   let [r, g, b, a] = rgbaToArr(str)
//   // const saturation = getSaturation(r, g, b)
//   // const incr = ~~(10 * (saturation * 2 - 1) * (1 / a)) + 10
//   // return saturation < 0.5
//   //   ? `rgba(${r + incr}, ${g + incr}, ${b + incr}, ${a})`
//   //   : `rgba(${r - incr}, ${g - incr}, ${b - incr}, ${a})`

//   const saturation = getSaturation(r, g, b)
//   let incr = 10 * (saturation * 2 - 1)
//   let hr = r,
//     hg = g,
//     hb = b

//   if (saturation < 0.5) {
//     incr += 20 * saturation + 10
//   }

//   incr *= 1 / a

//   r = Math.round(r / 127)
//   b = Math.round(b / 127)
//   g = Math.round(g / 127)

//   if (r <= g || r <= b) {
//     hr = hr - incr
//   }
//   if (g <= r || g <= b) {
//     hg = hg - incr
//   }
//   if (b <= r || b <= g) {
//     hb = hb - incr
//   }
//   return `rgba(${~~hr},${~~hg},${~~hb},${a})`
// }

// const Row = ({ name, value = 'rgba(0,0,0,1)' }) => {
//   const hoverColor = hoverColorFor(value)
//   const activeColor = hoverColorFor(hoverColor)
//   return (
//     <tr>
//       <td style={{ textAlign: 'left' }}>{name}</td>
//       <styled.td
//         style={{
//           cursor: 'pointer',
//           backgroundColor: value,
//           color: textColorFor(value),
//           '&:hover': {
//             backgroundColor: hoverColor,
//             color: textColorFor(hoverColor),
//           },
//           '&:active': {
//             backgroundColor: activeColor,
//             color: textColorFor(activeColor),
//           },
//         }}
//       >
//         {rgbaToArr(value).join(', ')}
//       </styled.td>
//       <td
//         style={{
//           backgroundColor: hoverColor,
//           color: textColorFor(hoverColor),
//         }}
//       >
//         {rgbaToArr(hoverColor).join(', ')}
//       </td>
//       <td
//         style={{
//           backgroundColor: activeColor,
//           color: textColorFor(activeColor),
//         }}
//       >
//         {rgbaToArr(activeColor).join(', ')}
//       </td>
//     </tr>
//   )
// }

// export const Theming = () => {
//   const [colors, setColors] = useState({
//     Primary: 'rgba(61,83,231,1)',
//     PrimaryLight: 'rgba(131,145,237,0.12)',
//     Text: 'rgba(15,16,19,0.87)',
//     TextSecondary: 'rgba(15,16,19,0.60)',
//     Background0dp: 'rgba(247,247,248,1)',
//     Background1dp: 'rgba(255,255,255,1)',
//     Background2dp: 'rgba(255,255,255,1)',
//     Background3dp: 'rgba(255,255,255,1)',
//     Overlay: 'rgba(15,16,19, 0.24)',
//   })

//   const [currentColor, setCurrentColor] = useState('Primary')

//   return (
//     <>
//       <ColorPicker
//         style={{ marginBottom: 16 }}
//         value={colors[currentColor]}
//         onChange={(color) => {
//           colors[currentColor] = color
//           setColors({ ...colors })
//         }}
//       />

//       <table
//         style={{
//           width: '100%',
//           ...font(),
//         }}
//       >
//         <thead>
//           <tr>
//             <td>Color</td>
//             <td>Default</td>
//             <td>Hover</td>
//             <td>Active</td>
//           </tr>
//         </thead>
//         <styled.tbody
//           style={{
//             fontWeight: 400,
//             '*': {
//               userSelect: 'text',
//               height: '50px',
//               width: '200px',
//               textAlign: 'center',
//             },
//           }}
//         >
//           {Object.keys(colors).map((key) => (
//             <Row key={key} name={key} value={colors[key]} />
//           ))}
//         </styled.tbody>
//       </table>
//     </>
//   )
// }

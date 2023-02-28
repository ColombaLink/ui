import { baseTheme } from '~/theme/baseTheme'
import { darkTheme } from '~/theme/darkTheme'
import { values } from '~/theme'
import React from 'react'
import { styled } from 'inlines'
import { border, Color, color, font } from '~/utils'
import { transparent } from '~/components/ColorPicker/bg'
import { useColorPicker } from '~/hooks'
import useLocalStorage from '@based/use-local-storage'
import { rgbaToArr } from '~/components/ColorPicker/utils'
import { ChevronDownIcon, DeleteIcon } from '~/icons'
import { Button } from '~/components/Button'
import { useDarkMode } from '~/hooks/useDarkMode'

const download = (data, filename) => {
  const a = document.createElement('a')
  a.setAttribute('href', data)
  a.setAttribute('download', filename)
  document.body.appendChild(a) // required for firefox
  a.click()
  a.remove()
}

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
            variant: variant === 'contrast' ? null : 'contrast',
          }),
          '@media (hover: hover)': {
            '&:hover': {
              background: color(name, 'hover'),
              color: color(name, 'contrast'),
            },

            '&:active': {
              background: color(name, 'active'),
            },
          },
        }}
      >
        Lorem Ipsum
      </styled.button>
    </td>
  )
}

const Colors = ({ light = false, onChange }) => {
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
    if (light) {
      name = name.substring(5)
    }
    console.log(
      { name, variant },
      [k, key, name, variant?.substring(0, 1) || 'm'],
      rgbaToArr(val)
    )
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
              <div style={{ display: 'flex' }}>
                <Button
                  color="text"
                  ghost
                  icon={ChevronDownIcon}
                  onClick={() => {
                    download(
                      'data:text/json;charset=utf-8,' +
                        encodeURIComponent(
                          JSON.stringify({ base: baseTheme, dark: darkTheme })
                        ),
                      `theme.json`
                    )
                  }}
                />
                <Button
                  ghost
                  color="red"
                  icon={DeleteIcon}
                  onClick={() => {
                    setThemes(null)
                    location.reload()
                  }}
                />
              </div>
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

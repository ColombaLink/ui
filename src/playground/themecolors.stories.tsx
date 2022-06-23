import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Color } from '~/types'
import { color } from '~/utils'

import { theme } from '../themes/light'

const ColorArr = theme.colors
console.log(ColorArr['AccentYellow'])

function HexCode(color) {
  const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
  const hex = `#${(
    (1 << 24) +
    (parseInt(rgba[0]) << 16) +
    (parseInt(rgba[1]) << 8) +
    parseInt(rgba[2])
  )
    .toString(16)
    .slice(1)}`

  return hex
}

export const ThemeColors = () => {
  return (
    <Provider>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          flexWrap: 'wrap',
          maxWidth: 1080,
          alignContent: 'space-between',
        }}
      >
        {Object.keys(ColorArr).map((val, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 200,
                height: 100,
                backgroundColor: color(val),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div>
                <Text size="sm">
                  {HexCode('rgba(' + ColorArr[val].join() + ')')}
                </Text>
              </div>

              <div>
                <Text>rgba({ColorArr[val].join()})</Text>
              </div>
            </div>
            <div>
              <Text weight={500} size="sm" style={{ margin: 10 }}>
                {val}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Provider>
  )
}

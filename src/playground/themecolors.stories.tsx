import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Color } from '~/types'
import { color } from '~/utils'

import { theme } from '../themes/light'

const ColorArr = theme.colors
console.log(ColorArr)

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
                width: 198,
                height: 65,
                backgroundColor: color(val),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{ColorArr[val]}</Text>
            </div>
            <div>
              <Text weight={500} size="sm" style={{ margin: 12 }}>
                {val}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Provider>
  )
}

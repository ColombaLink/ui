import React from 'react'
import * as icons from '../icons'
import { Provider } from '~'
import { Text } from '~/components/Text'

import { theme } from '../themes/light'

const ColorArr = theme.colors

const randomColorFromObj = (obj) =>
  Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0]

const randomColor = (): string =>
  `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`

export const Overview = () => (
  <>
    <div
      style={{
        margin: 12,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Text size="xs" style={{ marginRight: 32 }}>
        16px
      </Text>
      <Text size="xs">20px</Text>
    </div>

    <Provider style={{ display: 'block', flexWrap: 'wrap' }}>
      {Object.keys(icons).map((name, index) => (
        <div
          style={{
            margin: 12,
            display: 'flex',
            alignItems: 'center',
          }}
          key={index}
        >
          <div style={{ marginRight: 16 }}>
            {React.createElement(icons[name], {
              size: 16,
              color: randomColor(),
            })}
          </div>
          <div style={{ marginRight: 16 }}>
            {React.createElement(icons[name], {
              size: 16,
              color: randomColorFromObj(ColorArr),
            })}
          </div>
          {React.createElement(icons[name])}
          <div
            style={{
              marginLeft: 16,
            }}
          >
            {name}
          </div>
        </div>
      ))}
    </Provider>
  </>
)

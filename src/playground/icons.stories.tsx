import React from 'react'
import * as icons from '../icons'
import { Provider } from '~'
import { Text } from '~/components/Text'

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
      <Text size="xs" style={{ marginRight: 6 }}>
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

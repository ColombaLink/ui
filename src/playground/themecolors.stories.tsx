import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Color } from '~/types'
import { color } from '~/utils'
import { DuplicateIcon } from '../icons/DuplicateIcon'

import { theme } from '../themes/light'
import { useHover } from '~/hooks'

const ColorArr = theme.colors

const hover = false

const HexCode = (color) => {
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
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    HexCode('rgba(' + ColorArr[val].join() + ')')
                  )
                }}
              >
                {hover ? (
                  <Text size="sm">
                    <DuplicateIcon
                      size={16}
                      style={{ display: 'inline-block' }}
                    />{' '}
                    Copy
                  </Text>
                ) : (
                  <Text size="sm">
                    {HexCode('rgba(' + ColorArr[val].join() + ')')}
                  </Text>
                )}
              </div>

              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    'rgba(' + ColorArr[val].join() + ')'
                  )
                }}
              >
                {hover ? (
                  <Text>
                    <DuplicateIcon
                      size={16}
                      style={{ display: 'inline-block' }}
                    />{' '}
                    Copy
                  </Text>
                ) : (
                  <Text>rgba({ColorArr[val].join()})</Text>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(val)
              }}
            >
              {hover ? (
                <Text weight={500} size="sm" style={{ margin: 10 }}>
                  <DuplicateIcon
                    size={16}
                    style={{ display: 'inline-block' }}
                  />{' '}
                  Copy
                </Text>
              ) : (
                <Text weight={500} size="sm" style={{ margin: 10 }}>
                  {val}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>
    </Provider>
  )
}

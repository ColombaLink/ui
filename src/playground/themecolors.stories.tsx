import React, { useState } from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Color } from '~/types'
import { color } from '~/utils'
import { DuplicateIcon } from '../icons/DuplicateIcon'

import { theme } from '../themes/light'
import { useHover } from '~/hooks'

const ColorArr = theme.colors

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
            <ColorBlock val={val} />
          </div>
        ))}
      </div>
    </Provider>
  )
}

const ColorBlock = ({ val }) => {
  const { listeners, hover } = useHover()
  const [copied, setCopied] = useState(false)
  return (
    <>
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
          <Text size="14">{HexCode('rgba(' + ColorArr[val].join() + ')')}</Text>
        </div>

        <div
          onClick={() => {
            navigator.clipboard.writeText('rgba(' + ColorArr[val].join() + ')')
          }}
        >
          <Text>rgba({ColorArr[val].join()})</Text>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'block',
          boxSizing: 'border-box',
          height: 32,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => {
          navigator.clipboard.writeText(val)
          setCopied(true)
        }}
        {...listeners}
      >
        {hover ? (
          <Text weight={500} size="14" style={{ margin: 10 }}>
            <DuplicateIcon size={16} style={{ display: 'inline-block' }} />
            {copied ? ' Copied' : ' Copy'}
          </Text>
        ) : (
          <Text weight={500} size="14" style={{ margin: 10 }}>
            {val}
          </Text>
        )}
      </div>
    </>
  )
}

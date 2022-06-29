import React, { useState } from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { Color } from '~/types'
import { color } from '~/utils'
import { DuplicateIcon } from '../icons/DuplicateIcon'

import { theme } from '../themes/light'
import { useHover } from '~/hooks'

const ColorArr = theme.colors

export const ThemeColors = () => {
  return (
    <Provider>
      <div
        style={{
          display: 'flex',

          flexWrap: 'wrap',

          gap: 10,
          //width: 300,
          // alignContent: 'space-between',
        }}
      >
        {Object.keys(ColorArr)
          // .reverse()
          .map((val, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
          height: 60,
          borderRadius: 4,
          backgroundColor: color(val),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
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
          display: 'flex',
          alignItems: 'center',
          height: 32,
          justifyContent: 'center',
          paddingLeft: 8,
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
          <Text weight={500} size="14px" style={{ margin: 10 }}>
            <DuplicateIcon size={16} style={{ display: 'inline-block' }} />
            {copied ? ' Copied' : ' Copy'}
          </Text>
        ) : (
          <Text weight={500} size="14px" style={{ margin: 10 }}>
            {val}
          </Text>
        )}
      </div>
    </>
  )
}

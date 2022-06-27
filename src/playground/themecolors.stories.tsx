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
          textAlign: 'center',
          flexWrap: 'wrap',
          maxWidth: 1080,
          // alignContent: 'space-between',
        }}
      >
        {Object.keys(ColorArr)
          .reverse()
          .map((val, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                width: '100%',
                //  justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 800,
                marginBottom: 8,
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
          width: 220,
          height: 60,
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
          height: 60,
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

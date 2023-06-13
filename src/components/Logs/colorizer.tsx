import React from 'react'
import { color } from '~'

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}

const escape = (msg: string) =>
  msg.replace(/[&<>]/g, (tag) => tagsToReplace[tag] || tag)

const codes = {
  '\x1b[31m': { modifier: 'red', basedColor: 'red' },
  '\x1b[32m': { modifier: 'green', basedColor: 'green' },
  '\x1b[33m': { modifier: 'yellow', basedColor: 'yellow' },
  '\x1b[34m': { modifier: 'blue', basedColor: 'sailorblue' },
  '\x1b[35m': { modifier: 'magenta', basedColor: 'pink' },
  '\x1b[36m': { modifier: 'cyan', basedColor: 'babyblue' },
  '\x1b[37m': { modifier: 'white', basedColor: 'text' },
  '\x1b[90m': { modifier: 'gray', basedColor: 'grey' },
}

export const colorizer = (msg: string) => {
  msg = escape(msg)

  let oldPosition: number
  let position = 0

  while (position < msg.length) {
    if (position === oldPosition) {
      console.log('this is infinite')
      break
    }
    oldPosition = position
    const openStart = msg.indexOf('\x1b[', position)
    if (openStart > -1) {
      const openEnd = msg.indexOf('m', openStart)
      const openCode = msg.slice(openStart, openEnd + 1)
      let close = msg.indexOf('\x1b[', openEnd)
      if (close === -1) close = msg.length
      const code = codes[openCode]
      if (code) {
        const modifiedText = msg.slice(openEnd + 1, close)
        msg =
          msg.slice(0, openStart) +
          `<span style="color: ${color(code.basedColor)};">` +
          modifiedText +
          '</span>' +
          msg.slice(close)
        position = openStart + modifiedText.length
        continue
      }
      msg = msg.slice(0, openStart) + msg.slice(openEnd + 1)
      position = openEnd - openStart + 1
      continue
    }
    position = msg.length
  }

  return msg
}

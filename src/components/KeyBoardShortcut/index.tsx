import React, { FC } from 'react'
import { isTouchDevice, isMac } from '~/utils'
import { Key } from '~/types'

export const KeyBoardshortcut: FC<{ keyboardShortcut?: Key }> = ({
  keyboardShortcut,
}) => {
  if (isTouchDevice()) {
    return null
  }
  let str: string = keyboardShortcut
  if (keyboardShortcut.includes('Cmd')) {
    str = isMac() ? str.replace('Cmd', '⌘') : str.replace('Cmd', 'Ctrl')
  }
  return <> ({str})</>
}

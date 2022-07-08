import React from 'react'
import { Text as TextComponent } from '~'
import ComponentViewer from '../ComponentViewer'

export const Text = () => {
  const loadClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1e3))
  }
  const errorClick = async () => {
    await loadClick()
    throw Error('error')
  }
  return (
    <>
      <ComponentViewer component={TextComponent} />
    </>
  )
}

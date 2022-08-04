import React, { FC, createElement, useEffect } from 'react'
import { renderOrCreateElement } from '..'
import * as ui from '..'
import { IconProps } from '..'

const icons: FC[] = []
const iconNames: string[] = []

// console.log('from string to icon', ui)
// console.log('from string to icon', icons)
// console.log('from string to icon', iconNames)

export const stringToIcon = (element, props = undefined) => {
  // get all icons i guess
  useEffect(() => {
    for (const key in ui) {
      if (key.includes('Icon')) {
        iconNames.push(key)
        icons.push(ui[key])
      }
    }
  }, [])

  // console.log('from stron', iconNames.indexOf('AddIcon'))

  return renderOrCreateElement(icons[iconNames.indexOf(element)])
}

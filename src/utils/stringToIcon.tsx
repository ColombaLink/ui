import { FC, createElement, useEffect } from 'react'
import { renderOrCreateElement } from '..'
import * as ui from '..'
import { IconProps } from '..'

const icons: FC[] = []
const iconNames: string[] = []

export const stringToIcon = (element, props = undefined) => {
  // get all icons i guess

  for (const key in ui) {
    if (key.includes('Icon')) {
      iconNames.push(key)
      icons.push(ui[key])
    }
  }

  return renderOrCreateElement(icons[iconNames.indexOf(element)])
}

import React from 'react'
import * as ui from '../..'
import props from '../props.json'
import { LoremIpsum } from 'lorem-ipsum'

const { Text } = ui

const icons = []
const iconNames = []

const randomFromArr = (arr) => {
  return arr[~~(Math.random() * arr.length)]
}

for (const key in ui) {
  if (key.includes('Icon')) {
    iconNames.push(key)
    icons.push(ui[key])
  }
}

export const getRandomIconName = () => {
  return randomFromArr(iconNames)
}

export const getRandomIcon = () => {
  return randomFromArr(icons)
}

export const getRandomColor = () => {
  const t = randomFromArr(props.types['Color'].types)
  return genRandomProps('Color', { type: t.type })
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const genRandomWords = (short) => {
  if (!short && Math.random() > 0.7) {
    return lorem.generateParagraphs(~~(Math.random() * 7) + 1)
  }
  return lorem.generateWords(~~(Math.random() * 2) + 1)
}

export const genRandomProps = (name, prop) => {
  if (Array.isArray(prop.type)) {
    return genRandomProps(name, {
      type: randomFromArr(prop.type),
    })
  }

  if (prop.optional) {
    if (
      name === 'backgroundColor' ||
      name === 'outlineColor' ||
      name === 'hoverColor' ||
      name === 'foregroundColor'
    ) {
      return undefined
    }
    if (Math.random() < 0.3) {
      return undefined
    }
  }

  if (typeof prop.type === 'object') {
    return prop.type.value
  }

  if (prop.type === 'boolean') {
    return Math.random() < 0.5
  }

  if (prop.type === 'number') {
    return ~~(Math.random() * 1000)
  }

  if (props.types[prop.type]) {
    const t = randomFromArr(props.types[prop.type].types)
    return genRandomProps(name, { type: t.type })
  }

  if (prop.type === 'string' && name !== 'backgroundImg') {
    return genRandomWords(true)
  }

  if (name.includes('icon') && prop.type === 'FC') {
    return getRandomIcon()
  }

  if (name.includes('icon') && prop.type === 'ReactNode') {
    return React.createElement(getRandomIcon())
  }

  if (prop.type === 'FC') {
    return getRandomIcon()
  }

  if (prop.type === 'ReactNode') {
    if (Math.random() > 0.7) {
      return genRandomWords(false)
    }
    if (Math.random() > 0.65) {
      return React.createElement(getRandomIcon(), { size: 20 })
    }
    return React.createElement(Text, {
      weight: 700,
      children: genRandomWords(true),
    })
  }
}

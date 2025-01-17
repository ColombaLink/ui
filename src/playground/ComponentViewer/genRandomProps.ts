import { FC } from 'react'
import * as ui from '../..'
import { IconProps } from '../../'
import props from '../props.json'
import { LoremIpsum } from 'lorem-ipsum'
const { Text } = ui
export const icons: FC[] = []
const iconNames: string[] = []

for (const key in ui) {
  if (key.includes('Icon') && key !== 'stringToIcon') {
    iconNames.push(key)
    icons.push(ui[key])
  }
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const randomFromArr = (arr: any[]): any => {
  return arr[~~(Math.random() * arr.length)]
}

export const getRandomIconName = (): string => {
  return randomFromArr(iconNames)
}

export const getRandomIcon = (): FC<IconProps> => {
  return randomFromArr(icons)
}

export const getRandomColor = () => {
  // @ts-ignore
  const t = randomFromArr(props.types.Color.types)
  return genRandomProp('Color', { type: t.type })
}

const genRandomWords = (short) => {
  if (!short && Math.random() > 0.7) {
    return lorem.generateParagraphs(~~(Math.random() * 7) + 1)
  }
  return lorem.generateWords(~~(Math.random() * 5) + 1)
}

export const genRandomProp = (name, prop, short = false) => {
  if (Array.isArray(prop.type)) {
    return genRandomProp(
      name,
      {
        type: randomFromArr(prop.type),
      },
      short
    )
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
    if (prop.type?.value !== undefined) {
      return prop.type.value
    }
  }

  if (prop.type === 'boolean') {
    return Math.random() < 0.5
  }

  if (prop.type === 'number') {
    return ~~(Math.random() * 1000)
  }

  if (props.types[prop.type]) {
    const t = randomFromArr(props.types[prop.type].types)
    return genRandomProp(name, { type: t.type })
  }

  if (prop.type === 'string' && name !== 'img') {
    return genRandomWords(true)
  }

  if (name.includes('icon') && prop.type === 'FC' && name !== 'stringToIcon') {
    return getRandomIcon()
  }

  if (
    name.includes('icon') &&
    prop.type === 'ReactNode' &&
    name !== 'stringToIcon'
  ) {
    return React.createElement(getRandomIcon())
  }

  if (prop.type === 'FC') {
    return getRandomIcon()
  }

  if (prop.type === 'MouseEventHandler') {
    return () => global.alert('Do!')
  }

  if (prop.type === 'function') {
    return () => { }
  }

  if (prop.type === 'ReactNode') {
    if (Math.random() > 0.7) {
      return genRandomWords(short)
    }
    if (Math.random() > 0.65) {
      return React.createElement(getRandomIcon(), { size: 20 })
    }
    // eslint-disable-next-line
    return React.createElement(Text, {
      weight: 700,
      children: genRandomWords(true),
    })
  }
}

export const genRandomProps = (p: any, short: boolean = false): any => {
  const parsedProps = {}

  for (const key in p.props) {
    const rando = genRandomProp(key, p.props[key], short)
    if (rando !== undefined) {
      parsedProps[key] = rando
    }
  }

  return parsedProps
}

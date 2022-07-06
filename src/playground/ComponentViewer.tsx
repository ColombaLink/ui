import React, { FC, useEffect, useState, useRef } from 'react'
import * as ui from '../'
import props from './props.json'
import { LoremIpsum } from 'lorem-ipsum'
import useGlobalState from '@based/use-global-state'
import * as types from '../types'

const { Code, Text, Link, color } = ui

const icons = []

for (const key in ui) {
  if (key.includes('Icon')) {
    icons.push(ui[key])
  }
}

const getRandomIcon = () => {
  return icons[~~(Math.random() * icons.length)]
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

const viewProps = (props): string => {
  const p = { ...props }
  for (let k in p) {
    if (typeof p[k] === 'string' && p[k].length > 30) {
      p[k] = p[k].slice(0, 30) + '...'
    } else if (typeof p[k] === 'function') {
      p[k] = p[k].name
    } else if (typeof p[k] === 'object') {
      p[k] = 'Child'
    }
  }
  return JSON.stringify(p, null, 2)
}

const randomFromArr = (arr) => {
  return arr[~~(Math.random() * arr.length)]
}

const genRandomWords = (short) => {
  if (!short && Math.random() > 0.7) {
    return lorem.generateParagraphs(~~(Math.random() * 7) + 1)
  }
  return lorem.generateWords(~~(Math.random() * 2) + 1)
}

const genRandomProps = (name, prop) => {
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

  if (Array.isArray(props.types[prop.type])) {
    const t = randomFromArr(props.types[prop.type])
    return genRandomProps(name, { type: t })
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
      return <div>{React.createElement(getRandomIcon(), { size: 20 })}</div>
    }
    return React.createElement(Text, {
      weight: 700,
      children: genRandomWords(true),
    })
  }
}

const Variant: FC<{
  p: any
  component: FC
  width: number | '100%' | 'auto'
}> = ({ component, p, width }) => {
  const [props, setProps] = useState({})

  useEffect(() => {
    const parsedProps = {}
    for (const key in p.props) {
      const rando = genRandomProps(key, p.props[key])
      if (rando !== undefined) {
        parsedProps[key] = rando
      }
    }
    setProps(parsedProps)
  }, [component])

  let elem
  try {
    elem = React.createElement(component, props)
  } catch (err) {
    return (
      <div>
        <ui.Text>Wrong props</ui.Text>
        <Code
          style={{
            marginTop: 24,
          }}
        >
          {viewProps(props)}
        </Code>
      </div>
    )
  }

  return (
    <div
      style={{
        borderRadius: 5,
        margin: 12,
        padding: 24,
        width,
        height: 'fit-content',
        border: '1px solid ' + color('OtherDivider'),
      }}
    >
      <div>{elem}</div>
      <Code
        style={{
          marginTop: 24,
        }}
      >
        {viewProps(props)}
      </Code>
    </div>
  )
}

const ComponentViewer: FC<{
  component: FC
  propsName?: string
  nr?: number
  width?: number | '100%' | 'auto'
}> = ({ component, propsName, width = 'auto', nr = 50 }) => {
  console.log(component.name)
  if (!propsName) {
    propsName = component.name + 'Props'
  }

  const p = props.props[propsName]

  if (!p) {
    console.warn('Cannot find props', propsName)
    return <div />
  }
  const [expand, setExpand] = useGlobalState('expand')

  const examples = []

  for (let i = 0; i < (expand ? 100 : 0); i++) {
    examples.push(<Variant p={p} width={width} component={component} key={i} />)
  }

  return (
    <div
      style={{
        marginBottom: 48,
        paddingBottom: 48,
      }}
    >
      <Link href={`src${p.file}`}>
        <Text color="PrimaryMain" size={'18px'} style={{ marginBottom: 24 }}>
          {p.file.slice(1).split('/').slice(1, -1)}
        </Text>
      </Link>
      <Code>{p.code}</Code>
      <ui.Button
        outline
        ghost
        iconLeft={ui.ModelIcon}
        style={{ marginTop: 24 }}
        onClick={() => setExpand(!expand)}
      >
        {expand ? 'Hide random props' : 'Randomise props'}
      </ui.Button>

      <div
        style={{
          marginTop: 48,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {examples}
      </div>
    </div>
  )
}

export default ComponentViewer

import React, { FC, useEffect, useState, useRef } from 'react'
import * as ui from '../..'
import props from '../props.json'
import { genRandomProps } from './genRandomProps'
import { viewProps } from './viewProps'

const { Text, color, Code, Link, useSearchParam, setLocation } = ui

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
        maxWidth: '100%',
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
  const expand = useSearchParam('randomize')

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
        onClick={() =>
          setLocation({
            merge: true,
            params: { randomize: !expand },
          })
        }
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

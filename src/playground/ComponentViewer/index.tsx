import React, { FC, useEffect, useState, useRef } from 'react'
import * as ui from '../..'
import props from '../props.json'
import { Props } from './PropViewer'
import { Variant } from './Variant'

const { Text, color, Code, Link, useSearchParam, setLocation } = ui

const ComponentViewer: FC<{
  component: FC
  propsName?: string
  exampleProps?: any
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
  const fuzz = useSearchParam('randomize')
  const showType = useSearchParam('type')

  const examples = []

  for (let i = 0; i < (fuzz ? 300 : 0); i++) {
    examples.push(<Variant p={p} width={width} component={component} key={i} />)
  }

  return (
    <div
      style={{
        paddingBottom: 48,
        marginTop: 0,
        marginBottom: 48,
        borderBottom: '1px solid ' + color('OtherDivider'),
      }}
    >
      <Link href={`src${p.file}`}>
        <Text weight={700} size={'18px'} style={{ marginBottom: 24 }}>
          {p.file.slice(1).split('/').slice(1, -1)}
        </Text>
      </Link>
      <div style={{ marginTop: 24 }}>
        {showType ? (
          <Code
            style={{
              width: 550,
            }}
          >
            {p.code}
          </Code>
        ) : (
          <Props prop={p} />
        )}
      </div>
      <div style={{ marginTop: 48, display: 'flex' }}>
        <ui.Button
          outline
          ghost
          style={{ marginRight: 24 }}
          iconLeft={ui.ModelIcon}
          onClick={() =>
            setLocation({
              merge: true,
              params: { randomize: !fuzz },
            })
          }
        >
          {fuzz ? 'Hide Fuzz' : 'Fuzz'}
        </ui.Button>
        <ui.Button
          outline
          ghost
          iconLeft={ui.ModelIcon}
          onClick={() =>
            setLocation({
              merge: true,
              params: { type: !showType },
            })
          }
        >
          {showType ? 'Props' : 'Type'}
        </ui.Button>
      </div>

      {fuzz ? (
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {examples}
        </div>
      ) : null}
    </div>
  )
}

export default ComponentViewer

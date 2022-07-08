import React, { FC } from 'react'
import props from '../props.json'
import { Variant } from './Variant'
import { Text, color, Link, useSearchParam } from '../../'
import { Explorer } from './Explorer'

const ComponentViewer: FC<{
  component: FC
  propsName?: string
  exampleProps?: any
  exampleCode?: string
  width?: number | '100%' | 'auto' // fuzz width
}> = ({ component, propsName, width = 'auto', exampleProps, exampleCode }) => {
  const fuzz = useSearchParam('randomize')
  if (!propsName) {
    propsName = component.name + 'Props'
  }

  const p = props.props[propsName]
  if (!p) {
    return (
      <div
        style={{
          paddingBottom: 48,
          marginTop: 0,
          marginBottom: 48,
          borderBottom: '1px solid ' + color('bg', 'border'),
        }}
      >
        <Text weight={700} size={'18px'} style={{ marginBottom: 24 }}>
          {propsName}
        </Text>
      </div>
    )
  }
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
        borderBottom: '1px solid ' + color('bg', 'border'),
      }}
    >
      <Explorer
        exampleProps={exampleProps}
        exampleCode={exampleCode}
        name={propsName}
        p={p}
        component={component}
      />
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

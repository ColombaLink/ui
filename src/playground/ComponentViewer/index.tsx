import React, { FC } from 'react'
import props from '../props.json'
import { Text, color, Link, useSearchParam } from '../../'
import { Explorer } from './Explorer'

const ComponentViewer: FC<{
  component: FC
  propsName?: string
  examples?: { props?: any; code?: string; isModule?: boolean }[]
  width?: number | '100%' | 'auto' // fuzz width
}> = ({ component, propsName, width = 'auto', examples }) => {
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
        }}
      >
        <Text weight={700} size={'18px'} style={{ marginBottom: 24 }}>
          {propsName}
        </Text>
      </div>
    )
  }
  const fuzzArr = examples ? [...examples] : []

  for (let i = 0; i < (fuzz ? 50 : 0); i++) {
    fuzzArr.push({})
  }
  return (
    <div
      style={{
        paddingBottom: 48,
        marginTop: 0,
        marginBottom: 48,
      }}
    >
      <Explorer
        examples={fuzz ? fuzzArr : examples}
        name={propsName}
        p={p}
        component={component}
      />
    </div>
  )
}

export default ComponentViewer

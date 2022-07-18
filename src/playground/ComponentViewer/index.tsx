import React, { FC } from 'react'
import props from '../props.json'
import { Text, useSearchParam } from '../../'
import { Explorer } from './Explorer'

const ComponentViewer: FC<{
  component: FC
  propsName: string // mandatory otherwise it does not work when minified
  examples?: { props?: any; code?: string; component?: FC }[]
  width?: number | '100%' | 'auto' // fuzz width
}> = ({ component, propsName, width = 'auto', examples }) => {
  const fuzz = useSearchParam('randomize')
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
  const fuzzArr = []

  for (let i = 0; i < (fuzz ? 50 : 0); i++) {
    fuzzArr.push({})
  }
  return (
    <Explorer
      examples={fuzz ? fuzzArr : examples}
      name={propsName}
      p={p}
      component={component}
    />
  )
}

export default ComponentViewer

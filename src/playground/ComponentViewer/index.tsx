import { FC } from 'react'
import props from '../props.json'
import { Text, useSearchParam } from '../../'
import { Explorer } from './Explorer'

export type PropsDef = {
  name: string
  props: {
    [key: string]: {
      optional: boolean
      type: string
    }
  }
  code: string
  file: string
}

const ComponentViewer: FC<{
  component?: FC
  propsDef?: PropsDef
  propsName?: string
  examples?: { props?: any; code?: string; component?: FC }[]
  title?: string
}> = ({ propsDef, component, propsName, examples, title }) => {
  const [fuzz] = useSearchParam('randomize')

  const p = propsDef || props.props[propsName] || { props: {}, name: '' }
  if (!p) {
    return (
      <div
        style={{
          paddingBottom: 48,
          marginTop: 0,
          marginBottom: 48,
        }}
      >
        <Text weight={700} size="18px" style={{ marginBottom: 24 }}>
          {propsName}
        </Text>
        <Text>No props definition found</Text>
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
      name={propsName || title || component?.name || 'Untitled'}
      p={p}
      component={component}
      title={title}
    />
  )
}

export default ComponentViewer

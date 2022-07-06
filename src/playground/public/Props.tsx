import React from 'react'
import props from '../props.json'
import { Text } from '../../'
import { deepEqual } from '@saulx/utils'

const propsNames: {
  [key: string]: {
    name: string
    componentProps: { name: string; props: any; inconsistent?: boolean }[]
    inconsitencies: number
  }
} = {}

for (const p in props.props) {
  for (const k in props.props[p].props) {
    // if (propsNames[k]) {
    //   if (!deepEqual(props.props[p].props[k], propsNames[k])) {
    //     console.warn('props are not equal for', k, p)
    //   }
    // }

    // annotate inconsitencies

    if (!propsNames[k]) {
      propsNames[k] = {
        name: k,
        componentProps: [props.props[p]],
        inconsitencies: 0,
      }
    } else {
      if (
        !deepEqual(
          props.props[p].props[k],
          propsNames[k].componentProps[0].props[k]
        )
      ) {
        propsNames[k].inconsitencies++
        props.props[p].props[k].inconsistent = true
      }
      propsNames[k].componentProps.push(props.props[p])
    }
  }
}

export const Props = () => {
  return (
    <>
      <Text
        size="24px"
        style={{
          marginBottom: 24,
        }}
      >
        Props
      </Text>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.values(propsNames).map((v) => {
          return (
            <div key={v.name}>
              <div
                style={{
                  display: 'flex',
                  marginTop: 24,
                  marginRight: 24,
                }}
              >
                <Text
                  style={{
                    marginRight: 24,
                    width: 250,
                  }}
                >
                  {v.name}
                </Text>{' '}
                {v.inconsitencies > 0 ? (
                  <Text color={'Red'}>{v.inconsitencies}</Text>
                ) : null}
              </div>
              {v.componentProps.map((x) => {
                return (
                  <Text
                    color={
                      x.props[v.name].inconsistent ? 'Red' : 'TextDisabled'
                    }
                    size="12px"
                  >
                    {x.name}
                  </Text>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

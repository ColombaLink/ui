import React from 'react'
import props from '../props.json'
import { Text } from '../..'
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
      <Text weight={700} size="18px" style={{ marginBottom: 24 }}>
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
                  width: 350,
                  display: 'flex',
                  marginTop: 48,
                  marginRight: 48,
                }}
              >
                <Text
                  style={{
                    marginRight: 24,
                    width: 250,
                  }}
                >
                  {v.name}
                </Text>
              </div>

              {v.componentProps
                .sort((a, b) => {
                  return a.name < b.name ? -1 : a.name === b.name ? 0 : 1
                })
                .map((x) => {
                  return (
                    <Text key={x.name} size="12px">
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

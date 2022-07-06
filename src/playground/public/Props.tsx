import React from 'react'
import props from '../props.json'
import { Text } from '../../'
import { deepEqual } from '@saulx/utils'
import { SingleProp } from '../ComponentViewer/PropViewer'

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
              <SingleProp prop={v.componentProps[0].props[v.name]} />

              {v.componentProps.map((x) => {
                return (
                  <Text
                    key={x.name}
                    color={
                      x.props[v.name].inconsistent ? 'Primary' : 'TextDisabled'
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

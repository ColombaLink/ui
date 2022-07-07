import React, { FC, useEffect, useState, useRef } from 'react'
import { color, Text } from '../..'
import { genRandomProps } from './genRandomProps'

export const Variant: FC<{
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
        <Text>Wrong props</Text>
        {/* <Code
          style={{
            marginTop: 24,
          }}
        >
          {viewProps(props)}
        </Code> */}
      </div>
    )
  }

  return (
    <div
      style={{
        borderRadius: 5,
        marginTop: 12,
        marginRight: 12,
        marginBottom: 12,
        padding: 24,
        width,
        maxWidth: '100%',
        height: 'fit-content',
        border: '1px solid ' + color('OtherDivider'),
      }}
    >
      <div>{elem}</div>
      {/* <Code
        style={{
          marginTop: 24,
        }}
      >
        {viewProps(props)}
      </Code> */}
    </div>
  )
}

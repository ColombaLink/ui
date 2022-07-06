import React, { CSSProperties, FC } from 'react'
import { Text, Badge } from '../../'
import { Props } from '../public'

export const SingleProp: FC<{ style?: CSSProperties; prop: any }> = ({
  prop,
  style,
}) => {
  console.log(prop)

  let child = null

  if (typeof prop.type === 'string') {
    child = <Badge>{prop.type}</Badge>
  } else if (Array.isArray(prop.type)) {
    child = prop.type.map((v) => {
      return (
        <>
          <SingleProp style={{ marginRight: 8 }} prop={{ type: v }} />
        </>
      )
    })
  } else if (typeof prop.type === 'object') {
    child = <Badge color="Green">{prop.type.value}</Badge>
  }

  return (
    <div
      style={{
        marginLeft: -4,
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {child}
    </div>
  )
}

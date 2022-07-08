import React, { CSSProperties, FC } from 'react'
import { Text, Badge, copyToClipboard } from '../../'

export const SingleProp: FC<{ style?: CSSProperties; prop: any }> = ({
  prop,
  style,
}) => {
  let child = null

  if (typeof prop.type === 'string') {
    child = (
      <Badge
        onClick={() => {
          copyToClipboard(prop.type)
        }}
      >
        {prop.type}
      </Badge>
    )
  } else if (Array.isArray(prop.type)) {
    child = prop.type.map((v, i) => {
      return (
        <SingleProp
          key={i}
          style={{ margin: 0, marginRight: 8, marginBottom: 8 }}
          prop={{ type: v }}
        />
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

export const Props: FC<{ style?: CSSProperties; prop: any }> = ({
  prop,
  style,
}) => {
  const children = []

  for (const key in prop.props) {
    children.push(
      <div
        key={key}
        style={{
          display: 'flex',
          marginBottom: 18,
          alignItems: 'center',
        }}
      >
        <Text size={'12px'} style={{ width: 150 }}>
          {key}
        </Text>
        <SingleProp style={{ margin: 0 }} prop={prop.props[key]} />
      </div>
    )
  }

  return <div style={{ ...style }}>{children}</div>
}

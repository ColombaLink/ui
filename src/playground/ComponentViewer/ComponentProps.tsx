import React, { CSSProperties, FC } from 'react'
import { Text, Badge, copyToClipboard } from '../../'
import { propsToCode } from './objectToCode'

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
          style={{
            // margin: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 8,
            marginBottom: 8,
          }}
          prop={{ type: v }}
        />
      )
    })
  } else if (typeof prop.type === 'object') {
    if (prop.type.value) {
      child = (
        <Badge
          onClick={() => {
            copyToClipboard(prop.type.value)
          }}
          color="green"
        >
          {prop.type.value}
        </Badge>
      )
    } else if (prop.type.array) {
      return (
        <Badge
          onClick={() => {
            copyToClipboard(prop.type.array)
          }}
        >
          {prop.type.array}[]
        </Badge>
      )
    }
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
    const p = prop.props[key]
    children.push({
      child: (
        <div
          key={key}
          style={{
            display: 'flex',
            marginBottom: 18,
            alignItems: 'center',
          }}
        >
          <Text
            weight={p.optional ? 400 : 700}
            size={'14px'}
            style={{ width: 175 }}
          >
            {key}
          </Text>
          <SingleProp style={{ margin: 0 }} prop={p} />
        </div>
      ),
      key,
      prop: p,
    })
  }

  return (
    <div style={{ ...style }}>
      {children
        .sort((a, b) => {
          if (a.prop.optional === b.prop.optional) {
            return a.key.localeCompare(b.key)
          }
          if (a.prop.optional && !b.prop.optional) {
            return 1
          } else {
            return -1
          }
        })
        .map((v) => v.child)}
    </div>
  )
}

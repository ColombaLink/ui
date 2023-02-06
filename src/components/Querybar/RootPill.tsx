import React from 'react'
import { Select, Text, ArrowRightIcon, StackIcon } from '~'
import { color } from '~/utils'

export const RootPill = ({ query, setQuery }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: 280,
        height: 30,
        marginBottom: 12,
      }}
    >
      <Text
        wrap
        color="text2"
        style={{
          height: 30,
          padding: 8,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          backgroundColor: color('background2'),
          borderRight: `1px solid ${color('border')}`,
        }}
      >
        IN
      </Text>
      <Text
        style={{
          display: 'flex',
          gap: 8,
          height: 30,
          padding: 8,
          minWidth: 96,
          backgroundColor: color('background2'),
          borderRight: `1px solid ${color('border')}`,
        }}
      >
        <StackIcon size={16} color="accent" />
        Root
      </Text>
      <Select
        style={{
          width: 96,
          height: 30,
          backgroundColor: color('background2'),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        }}
        value={query.field}
        options={['ancestors', 'descendants', 'children', 'parents']}
        onChange={(value) => {
          console.log('value', value)
          query.field = value
          setQuery({ ...query })
          console.log('query', query)
        }}
      />
      <ArrowRightIcon size={32} />
    </div>
  )
}

import React from 'react'
import { Select, Text, ArrowRightIcon } from '~'

export const RootPill = ({ query, setQuery }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: 240,
        gap: 8,
        border: '1px solid orange',
      }}
    >
      <Text wrap>IN</Text>
      <Text wrap>ROOT</Text>
      <Select
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

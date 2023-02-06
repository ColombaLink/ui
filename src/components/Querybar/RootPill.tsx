import React from 'react'
import { Select, Text, ArrowRightIcon, StackIcon } from '~'
import { color } from '~/utils'
import { styled } from 'inlines'

const StyledSelect = styled(Select, {
  backgroundColor: color('lighttext'),

  '& svg': {
    display: 'none',
  },
})

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
          padding: 10,
          display: 'flex',
          alignItems: 'center',
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          backgroundColor: color('lighttext'),
          borderRight: `1px solid ${color('border')}`,
        }}
      >
        IN
      </Text>
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 30,
          padding: 10,
          minWidth: 74,
          backgroundColor: color('lighttext'),
          borderRight: `1px solid ${color('border')}`,
        }}
      >
        <StackIcon size={16} color="accent" />
        Root
      </Text>
      <StyledSelect
        style={{
          width: 140,
          height: 30,
          //   backgroundColor: color('lighttext'),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          border: `1px solid transparent`,
          '&:hover': {
            background: 'purple',
          },
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
      <ArrowRightIcon size={16} style={{ marginLeft: 8, marginRight: 8 }} />
    </div>
  )
}

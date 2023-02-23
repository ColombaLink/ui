import React from 'react'
import { styled } from 'inlines'
import { Text, StackIcon, ArrowRightIcon, LinkIcon, color } from '~'

export const RootPill = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <styled.div
        style={{
          height: 28,
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          backgroundColor: color('lightgrey'),
          borderRight: `1px solid ${color('border')}`,
          position: 'relative',
          cursor: 'text',
          '&:hover': {
            backgroundColor: color('lightgrey:hover'),
          },
        }}
      >
        <Text color="text2">IN</Text>
      </styled.div>
      <styled.div
        style={{
          height: 28,
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color('lightgrey'),
          borderRight: `1px solid ${color('border')}`,
          position: 'relative',
          cursor: 'text',
          '&:hover': {
            backgroundColor: color('lightgrey:hover'),
          },
        }}
      >
        <StackIcon color="accent" style={{ marginRight: 8 }} />
        <Text>Root</Text>
      </styled.div>
      <styled.div
        style={{
          height: 28,
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          backgroundColor: color('lightgrey'),
          borderRight: `1px solid ${color('border')}`,
          position: 'relative',
          cursor: 'text',
          '&:hover': {
            backgroundColor: color('lightgrey:hover'),
          },
        }}
      >
        <LinkIcon color="accent" style={{ marginRight: 8 }} />
        <Text>Children</Text>
      </styled.div>
      <ArrowRightIcon style={{ marginLeft: 12, marginRight: 12 }} />
    </div>
  )
}

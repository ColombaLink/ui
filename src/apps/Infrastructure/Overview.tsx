import { Provider, useQuery } from '@based/react'
import React from 'react'
import { styled, Badge } from '~'

export const OverviewInner = () => {
  const { data } = useQuery('based:connections')
  const { data: d } = useQuery('based:connectionsPerHub')

  console.info('connectionsPerHub', d)

  return (
    <styled.div
      style={{
        padding: 24,
      }}
    >
      <Badge color="accent">Active connections {data ?? 0}</Badge>
    </styled.div>
  )
}

export const Overview = ({ envAdminHub }) => {
  return (
    <Provider client={envAdminHub}>
      <OverviewInner />
    </Provider>
  )
}

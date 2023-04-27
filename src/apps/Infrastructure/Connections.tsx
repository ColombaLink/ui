import { Provider, useQuery } from '@based/react'
import React from 'react'
import { prettyNumber } from '@based/pretty-number'
import { styled, Button, UserIcon } from '~'

export const OverviewInner = () => {
  const { data } = useQuery('based:connections')
  // const { data: d } = useQuery('based:connectionsPerHub')

  // can make this super interessting
  // console.info('connectionsPerHub', d)

  return (
    <styled.div
      style={
        {
          // padding: 24,
        }
      }
    >
      <Button large icon={UserIcon} ghost color="accent">
        {prettyNumber(data ?? 0, 'number-short')}
      </Button>
    </styled.div>
  )
}

export const Connections = ({ envAdminHub }) => {
  return (
    <Provider client={envAdminHub}>
      <OverviewInner />
    </Provider>
  )
}

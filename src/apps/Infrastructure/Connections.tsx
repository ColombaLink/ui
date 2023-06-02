import { Provider, useQuery } from '@based/react'
import React from 'react'
import { prettyNumber } from '@based/pretty-number'
import { Button, UserIcon, useContextState } from '~'

export const OverviewInner = () => {
  const { data } = useQuery('based:connections')
  const [, setPage] = useContextState<string>('infraSection')
  return (
    <Button
      onClick={() => {
        setPage('all')
      }}
      icon={UserIcon}
      ghost
      color="accent"
    >
      {prettyNumber(data ?? 0, 'number-short')}
    </Button>
  )
}

export const Connections = ({ envAdminHub }) => {
  return (
    <Provider client={envAdminHub}>
      <OverviewInner />
    </Provider>
  )
}
